const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const service__parkingLog = require("../services/parking-log-service");

const getAllLogs = (req, res) => {
	const data = service__parkingLog
		.getAllLogs()
		.then((allLogs) => {
			res.send({
				status: "OK",
				data: allLogs,
			});
		});
};

const getLogsWithinGivenTime = (req, res, next) => {
	const date = req.params.date;
	const from = req.params.from;
	const to = req.params.to;

	console.log(date);
	console.log(from);
	console.log(to);

	const logs = service__parkingLog
		.getLogsWithinGivenTime(date, from, to)
		.then((searchedLogs) => {
			if (searchedLogs === "no matching entries")
				return next(
					new HttpError("No matching entries found", 404)
				);
			res
				.status(201)
				.send({ status: "OK", data: searchedLogs });
		});
};

const addLog = (req, res) => {
	const { body } = req;
	const errors = validationResult(req);
	if (!errors.isEmpty())
		throw new HttpError(
			"Invalid inputs passed, please check your data",
			422
		);

	const log = {
		employeeId: body.employeeId,
		name: body.name,
		vehicleId: body.vehicleId,
		status: body.status,
		date: body.date,
		time: body.time,
	};

	const updatedLog = service__parkingLog
		.addLog(log)
		.then((addedLog) => {
			res
				.status(201)
				.send({ status: "OK", data: addedLog });
		});
};

const getAllLogsById = (req, res, next) => {
	const emid = req.params.emid;

	const data = service__parkingLog
		.getAllLogsById(emid)
		.then((logs) => {
			res.send({
				status: "OK",
				data: logs,
			});
		});
};

const getLogStatus = (req, res, next) => {
	const emid = req.params.emid;

	const data = service__parkingLog
		.getLogStatus(emid)
		.then((status) => {
			res.send({
				status: "OK",
				data: status,
			});
		});
};

module.exports = {
	getAllLogs,
	getLogsWithinGivenTime,
	addLog,
	getAllLogsById,
	getLogStatus,
};
