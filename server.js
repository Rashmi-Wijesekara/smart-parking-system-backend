const express = require("express");
const bodyParser = require("body-parser");

const HttpError = require("./models/http-error");

const router__employee = require("./routes/employee-routes")

const server = express();
server.use(bodyParser.json());

server.use("/api/employee", router__employee)

// check server configuration
server.use("/", (req, res) => {
	res.json({ message: "welcome to the server!" });
});

// 404 not found ERROR
server.use((req, res, next) => {
	const error = new HttpError(
		"Could not find this route",
		404
	);
	throw error;
});

// ERRORS responding
server.use((error, req, res, next) => {
	if (res.headerSent) return next(error);

	res.status(error.code || 500);
	res.json({
		message: error.message || "An unknown error occurred",
	});
});

server.listen(5000);
