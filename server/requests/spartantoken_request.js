var request = require("request");
var lib = require("../librarian");

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
      var spartantoken = JSON.parse(body).SpartanToken,
        gamertag = JSON.parse(body).UserInformation.Gamertag;
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