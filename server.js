const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");

const router__employee = require("./routes/employee-routes");
const router__parkingLog = require("./routes/parking-log-routes");
const router__securityOfficer = require("./routes/security-officer-routes");
const router__shiftLog = require("./routes/shift-log-routes");

const server = express();

// able to parse the sent JSON inside the request body
server.use(bodyParser.json());

// handle CORS errors
server.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
	next();
});

// connect routers
server.use("/api/employee", router__employee);
server.use("/api/parking-log", router__parkingLog);
server.use(
	"/api/security-officer/shift-log",
	router__shiftLog
);
server.use(
	"/api/security-officer",
	router__securityOfficer
);

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

// if the database connection is successfull we can start the server
mongoose
	.connect(
		"mongodb+srv://megamedia:smartparkingsystem@cluster0.wbfkpvo.mongodb.net/smart-parking-system?retryWrites=true&w=majority"
	)
	.then(() => {
		server.listen(5000);
	})
	.catch((err) => {
		console.log(err);
	});
