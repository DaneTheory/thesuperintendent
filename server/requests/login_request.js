var request = require("request");
var lib = require("../librarian");

function getLogin(username, password, url, ppft, ppsx, callback) {
  request.post({
    "url": url,
    "method": "POST",
    "headers": {
      "User-Agent": lib.constants.USERAGENT,
      "Referer": lib.constants.REFERER
    },
    "form": {
      "PPFT": ppft,
      "login": username,
      "passwd": password,
      "LoginOptions": "3",
      "NewUser": "1",
      "PPSX": ppsx,
      "type": "11",
      "i3": "17337",
      "m1": "1920",
      "m2": "1080",
      "m3": "0",
      "i12": "1",
      "i17": "0",
      "i18": "__MobileLogin|1,"

    }
  }, function (error, response, body) {
    if (response == null || response.headers == null || response.headers.location == null) {
      console.log("ERR: Died redirecting");
      callback(null, "No redirect");
    } else {
      console.log("INFO: redirected");
      var redirectURL = {
        "redirectURL": response.headers.location
      };
      callback(redirectURL, null);
    }
  });
}

exports.execute = getLogin;