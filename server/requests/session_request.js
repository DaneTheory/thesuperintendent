var request = require("request");
var lib = require("../librarian");

function getSession(callback) {
  request({
    "url": lib.constants.LOGINURL,
    "headers": {
      "User-Agent": lib.constants.USERAGENT,
      "Referer": lib.constants.REFERER
    }
  }, function (error, response, body) {
    var PPSXregex = new RegExp("F:\'[a-zA-Z]+\'"),
      PPFTregex = new RegExp("value=\"[^\"]+\""),
      PostURLregex = new RegExp("urlPost:\'[^\']+\'");
    try {
      var PPSX = PPSXregex.exec(body)[0].split("\'")[1],
        PPFT = PPFTregex.exec(body)[0].split("\"")[1],
        PostURL = PostURLregex.exec(body)[0].split("\'")[1];
      console.log("INFO: scraped [PPSX, PPFT, PostURL]");
      var sessionVars = {
        "PPSX": PPSX,
        "PPFT": PPFT,
        "PostURL": PostURL
      };
      callback(sessionVars, null);
    } catch (e) {
      console.log("ERR: Died scraping PPSX/PPFT");
      callback(null, e.message);
    }
  });
}

exports.execute = getSession;