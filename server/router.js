var composer = require("./composer");
var lib = require("./librarian");
// The main function of the router now is to authenticate use of the server and verify the existence of a username and password
function route(user, pass, serverpass, response) {
  if (serverpass !== lib.constants.DEFINITELYNOTTHESERVERPASSWORD) {
    composer.composeSimpleResponse(response, 401, "Unauthorized", lib.constants.PLAINTEXT);
  } else if (user != null && pass != null) {
    composer.composeCommendationResponse(user, pass, response);
  } else {
    composer.composeSimpleResponse(response, 400, "Missing username and/or password.", lib.constants.PLAINTEXT);
  }
}
exports.route = route;