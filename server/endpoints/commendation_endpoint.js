var request = require("request"),
  lib = require("../librarian");
// This endpoint contains a user's commendation data
// This is the fifth and final request
function getCommend(spartantoken, gamertag, callback) {
  var commendEndpointURL = lib.constants.COMMENDATIONENDPOINT.replace("%s", gamertag); // Personalize url per gamertag
  request({
    "url": commendEndpointURL,
    "headers": {
      "User-Agent": lib.constants.USERAGENT,
      "X-343-Authorization-Spartan": spartantoken, // Auth using SpartanToken
      "Accept": lib.constants.JSON // We want JSON back, default is XML
    }
  }, function (error, response, body) {
    if (body != null) { // Fail if no body
      console.log("INFO: Got commendations");
      callback(body, null);
    } else {
      console.log("ERR: Commendations are null");
      callback(null, error);
    }
  });
}
exports.get = getCommend;