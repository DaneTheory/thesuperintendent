var lib = require("./librarian"),
// Requests
  sessionRequest = require("./requests/session_request"),
  loginRequest = require("./requests/login_request"),
  waypointRequest = require("./requests/waypoint_request"),
  spartanRequest = require("./requests/spartantoken_request"),
// Endpoints
  commendEndpoint = require("./endpoints/commendation_endpoint");

function composeSimpleResponse(response, statusCode, body, bodyContent) {
  response.writeHead(statusCode, {
    "Content-Type": bodyContent,
    "Access-Control-Allow-Origin": lib.constants.SITEURL
  });
  response.write(body);
  response.end();
}

// Authenticates and then gets a user's commendation data
function composeCommendationResponse(user, pass, response) {
  //session -> login -> waypoint -> spartan -> commend
  sessionRequest.execute(function (session_response, session_error) {
    if (session_error != null)
      composeSimpleResponse(response, 500, session_error, lib.constants.PLAINTEXT);
    else
      loginRequest.execute(user, pass, session_response.PostURL, session_response.PPFT, session_response.PPSX, function (login_response, login_error) {
        if (login_error != null)
          composeSimpleResponse(response, 500, login_error, lib.constants.PLAINTEXT);
        else
          waypointRequest.execute(login_response.redirectURL, function (waypoint_response, waypoint_error) {
            if (waypoint_error != null)
              composeSimpleResponse(response, 500, waypoint_error, lib.constants.PLAINTEXT);
            else
              spartanRequest.execute(waypoint_response.accessToken, function (spartan_response, spartan_error) {
                if (spartan_error != null)
                  composeSimpleResponse(response, 500, spartan_error, lib.constants.PLAINTEXT);
                else
                  commendEndpoint.get(spartan_response.spartanToken, spartan_response.gamertag, function (commend_response, commend_error) {
                    if (commend_error != null)
                      composeSimpleResponse(response, 500, commend_error, lib.constants.PLAINTEXT);
                    else {
                      composeSimpleResponse(response, 200, commend_response, lib.constants.JSON);
                    }
                  });
              });
          });
      });
  });
}
exports.composeSimpleResponse = composeSimpleResponse;
exports.composeCommendationResponse = composeCommendationResponse;