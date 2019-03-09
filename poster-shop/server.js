var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var server = require("http").createServer(app);

app.use(express.json());

app.get("/", function(req, res) {
	res.sendfile(path.join(__dirname + "/index.html"));
});

app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use("/public", express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV !== "production") {
	require("reload")(app);
}

var port = process.env.PORT || 3000;
server.listen(port, function() {
	console.log("Listening on port ".concat(port));
});
