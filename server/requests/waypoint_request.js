var request = require("request"),
  lib = require("../librarian");

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
        accessToken = "v1=" + accessTokenregex.exec(body)[0].split("\'")[1],
        authToken = authTokenregex.exec(body)[0].split("\'")[1],
        timeout = timeoutregex.exec(body)[0].split(":")[1];
      console.log("INFO: Got accesstoken");
      var tokens = {
        "accessToken": accessToken,
        "authToken": authToken,
        "timeout": timeout
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