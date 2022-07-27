const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const service__parkingLog = require("../services/parking-log-service")

const getAllLogs = (req, res) => {
	const allLogs = service__parkingLog.getAllLogs()
	
	res.send({
		status: "OK",
		data: allLogs,
	});
}

const getLogsWithinGivenTime = (req, res) => {
	return;
};

const addLog = (req, res) => {
	return;
};

module.exports = {
	getAllLogs,
	getLogsWithinGivenTime,
	addLog
}