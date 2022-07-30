const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const service__shiftLog = require("../services/shift-log-service");

const getAllLogsById = (req, res, next) => {
	const soid = req.params.soid;
	const data = service__shiftLog
		.getAllLogsById(soid)
		.then((allLogs) => {
			if (!allLogs || allLogs.length === 0) {
				return next(
					new HttpError(
						`could not find any shift logs for ID ${soid}`,
						404
					)
				);
			}
			res.send({
				status: "OK",
				data: allLogs,
			});
		});
};

const addLog = (req, res, next) => {
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

	const data = service__shiftLog
		.addLog(log)
		.then((addedLog) => {
			if (!addedLog) {
				return next(
					new HttpError(
						`could not find a security officer for ID ${soid}`,
						404
					)
				);
			}
			res
				.status(201)
				.send({ status: "OK", data: addedLog });
		});
};

const updateLog = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		throw new HttpError(
			"Invalid inputs passed, please check your data",
			422
		);

	const soid = req.params.soid;
	const endTime = req.body.endTime;

	const data = service__shiftLog
		.updateLog(soid, endTime)
		.then((updatedLog) => {
			if (updatedLog === "no log found")
				return next(
					new HttpError(
						`could not find a log for id ${soid} to update the end time`,
						404
					)
				);
			else if (!updatedLog)
				return next(
					new HttpError(
						`could not find a security officer for ID ${soid}`,
						404
					)
				);

			res
				.status(201)
				.send({ status: "OK", data: updatedLog });
		});
};

const getTodaysLog = (req, res, next) => {
	const soid = req.params.soid;
	const data = service__shiftLog
		.getTodaysLog(soid)
		.then((todaysLog) => {
			if (todaysLog === "no officer")
				return next(new HttpError(
					`could not find a security officer for ID ${soid}`,
					404
				))
			else if (!todaysLog)
				return next(new HttpError(
					`no entries for ID ${soid} today`,
					404
				))

			res
				.status(201)
				.send({ status: "OK", data: todaysLog });
		});
};

module.exports = {
	getAllLogsById,
	addLog,
	updateLog,
	getTodaysLog,
};
