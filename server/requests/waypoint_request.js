var request = require("request"),
  lib = require("../librarian");
// This request gets your OAuth token which allows you to get a SpartanToken
// This is the third request
function getWaypoint(redirectURL, callback) {
  request({
    url: redirectURL,
    headers: {
      'User-Agent': lib.constants.USERAGENT
    }
  }, function (error, response, body) {
    try {
      var accessTokenregex = new RegExp("access_token:\'[^\']+\'"),
        authTokenregex = new RegExp("AuthenticationToken:\'[^\']+\'"),
        timeoutregex = new RegExp("expires_in:[0-9]+"),
        accessToken = "v1=" + accessTokenregex.exec(body)[0].split("\'")[1], // Once again, strip the parameter names
        authToken = authTokenregex.exec(body)[0].split("\'")[1], 
        timeout = timeoutregex.exec(body)[0].split(":")[1]; 
      console.log("INFO: Got accesstoken");
      var tokens = {
        "accessToken": accessToken,
        "authToken": authToken, // Currently unused...
        "timeout": timeout // Currently unused...
      };
      callback(tokens, null);
    } catch (e) {
      console.log("ERR: Died scraping authtoken");
      callback(null, e.message);
      return;
    }
  });
}
exports.execute = getWaypoint;