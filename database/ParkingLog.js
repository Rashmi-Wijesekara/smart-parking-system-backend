const mongoose = require("mongoose");
const model__parkingLog = require("../mongodb/ParkingLog-model");

const DateTime = require("../models/date-time");

const getAllLogs = async () => {
	// most recent entry at the top
	return await model__parkingLog
		.find()
		.sort({ date: -1, time: 1 });
};

const getLogsWithinGivenTime = async (date, from, to) => {
	let fullResult = []

	const result = await model__parkingLog
		.where(
			{ date: date }
			// { time: { $gte: from, $lte: to } }
		)
		// .where({ time: { $gte: from, $lte: to } })
		.sort({time: 1 });

	result.forEach((log)=> {
		if (
			DateTime.isPast(from, log.time) === false &&
			DateTime.isPast(to, log.time) === true
		)
			fullResult.push(log);
	})
	return fullResult;
};

const addLog = async (body) => {
	const newLog = new model__parkingLog({
		employeeId: body.employeeId,
		name: body.name,
		vehicleId: body.vehicleId,
		status: body.status,
		date: body.date,
		time: body.time,
	});

	await newLog.save();
	return newLog;
};

module.exports = {
	getAllLogs,
	getLogsWithinGivenTime,
	addLog,
};
