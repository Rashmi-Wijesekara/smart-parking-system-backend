const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const service__shiftLog = require("../services/shift-log-service");

const getAllLogsById = (req, res) => {
	return;
};

const addLog = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		throw new HttpError(
			"Invalid inputs passed, please check your data",
			422
		);

	const date = req.body.date;
	const startTime = req.body.startTime;
	const soid = req.params.soid;

	const log = {
		soid: soid,
		date: date,
		startTime: startTime,
	};

	const addedLog = service__shiftLog.addLog(log);

	res.status(201).send({ status: "OK", data: addedLog });
};

const updateLog = (req, res) => {
	return;
};

const getTodaysLog = (req, res) => {
	return;
};

module.exports = {
	getAllLogsById,
	addLog,
	updateLog,
	getTodaysLog,
};
