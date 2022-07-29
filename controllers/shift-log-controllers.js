const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const service__shiftLog = require("../services/shift-log-service");

const getAllLogsById = (req, res) => {
	const soid = req.params.soid;
	const allLogs = service__shiftLog.getAllLogsById(soid);

	if(!allLogs || allLogs.length === 0) {
		throw new HttpError(
			`could not find any shift logs for ID ${soid}`,
			404
		);
	}
	res.send({
		status: "OK",
		data: allLogs,
	});
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
		officerId: soid,
		date: date,
		startTime: startTime,
	};

	const addedLog = service__shiftLog.addLog(log);

	if (!addedLog) {
		throw new HttpError(
			`could not find a security officer for ID ${soid}`,
			404
		);
	}

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
