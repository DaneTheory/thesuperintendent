var request = require("request"),
  lib = require("../librarian");

function getCommend(spartantoken, gamertag, callback) {
  var commendEndpointURL = lib.constants.COMMENDATIONENDPOINT.replace("%s", gamertag);
  request({
    "url": commendEndpointURL,
    "headers": {
      "User-Agent": lib.constants.USERAGENT,
      "X-343-Authorization-Spartan": spartantoken,
      "Accept": lib.constants.JSON
    }
  }, function (error, response, body) {
    if (body != null) {
      console.log("INFO: Got commendations");
      callback(body, null);
    } else {
      console.log("ERR: Commendations are null");
      callback(body, error);
    }
  });
}
exports.get = getCommend;