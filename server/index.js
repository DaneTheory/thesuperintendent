var http = require("http");
var url = require("url");
var qs = require("querystring");
var router = require("./router");
http.createServer(function (request, response) { // The single entrance point to the server
  var parsedQuery = qs.parse(url.parse(request.url).query);
  router.route(parsedQuery.user, parsedQuery.pass, parsedQuery.serverpass, response);
}).listen(1337);