var http = require("http");
var url = require("url");
var server = http.createServer();

server.on("request",function(req,res){
	var incomingURL=url.parse(req.url);
	console.log(incomingURL);
	res.writeHead(200,{"Content-Type":"Text/Plain"});
	res.end("hello world");
});

server.listen(8000);
