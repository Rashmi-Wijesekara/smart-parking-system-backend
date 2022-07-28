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
	const date = req.params.date
	const from = req.params.from
	const to = req.params.to

	console.log(date)
	console.log(from)
	console.log(to)

	const searchedLogs = service__parkingLog.getLogsWithinGivenTime(date, from, to)

	if(searchedLogs === "no matching entries")
		throw new HttpError(
			"No matching entries found",
			404
		);
	res.status(201).send({ status: "OK", data: searchedLogs });
};

const addLog = (req, res) => {
	const {body} = req;
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
		time: body.time
	}

	const addedLog = service__parkingLog.addLog(log);

	res
		.status(201)
		.send({ status: "OK", data: addedLog });
};

module.exports = {
	getAllLogs,
	getLogsWithinGivenTime,
	addLog
}