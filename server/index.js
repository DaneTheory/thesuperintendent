var http = require("http");
var url = require("url");
var qs = require("querystring");
var router = require("./router");
http.createServer(function (request, response) {
  var parsedQuery = qs.parse(url.parse(request.url).query);
  router.route(parsedQuery.user, parsedQuery.pass, parsedQuery.serverpass, response);
}).listen(1337);