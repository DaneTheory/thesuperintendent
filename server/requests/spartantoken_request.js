var request = require("request");
var lib = require("../librarian");
// This request gets your SpartanToken which allows you to authenticate on the Halo 4 endpoints
// This is the fourth request
function getSpartanToken(accessToken, callback) {
  request({
    "url": lib.constants.SPARTANTOKENURL,
    "headers": {
      "User-Agent": lib.constants.USERAGENT,
      "X-343-Authorization-WLID": accessToken,
      "Accept": lib.constants.JSON
    }
  }, function (error, response, body) {
    try {
      var parsedResponse = JSON.parse(body);
      var spartantoken = parsedResponse.SpartanToken,
        gamertag = parsedResponse.UserInformation.Gamertag; // The gamertag is required for creating the endpoint url
      console.log("INFO: Got spartantoken");
      var tokenTag = {
        "spartanToken": spartantoken,
        "gamertag": gamertag
      };
      callback(tokenTag, null);
    } catch (e) {
      console.log("ERR: Died scraping SpartanToken");
      callback(null, e.message);
    }
  });
}
exports.execute = getSpartanToken;