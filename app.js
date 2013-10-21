var app = require('http').createServer(handler),
	io = require("socket.io").listen(app),
	fs = require("fs");

function handler(req, res) {

	fs.readFile(__dirname +  req.url,
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}

			res.writeHead(200);
			res.end(data);
		}
	);
};

io.sockets.on("connection", function(socket){
	socket.on("print", function(data) {
		io.sockets.emit("show", data);
	});
});

app.listen(3000, function() {
	console.log("server on...");
});



