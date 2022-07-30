const mongoose = require("mongoose")
const model__parkingLog = require("../mongodb/ParkingLog-model")

const DateTime = require("../models/date-time");

const getAllLogs = async () => {
	return await model__parkingLog.find()
};

const getLogsWithinGivenTime = async (date, from, to) => {
	const selected = database.parkingLog.filter((entry) => {
		if (entry.date === date) {
			return (
				DateTime.isPast(from, entry.time) === false &&
				DateTime.isPast(to, entry.time) === true
			);
		}
	});

	if (!selected || selected.length === 0) {
		return "no matching entries";
	}
	// console.log(selected);
	return selected;
};

const addLog = async (body) => {
	const newLog = new model__parkingLog({
		employeeId: body.employeeId,
		name: body.name,
		vehicleId: body.vehicleId,
		status: body.status,
		date: body.date,
		time: body.time
	});

	await newLog.save();
	return newLog
};

module.exports = {
	getAllLogs,
	getLogsWithinGivenTime,
	addLog,
};

/*
var input = "10:23 PM",
	matches = input
		.toLowerCase()
		.match(/(\d{1,2}):(\d{2}) ([ap]m)/),
	output =
		parseInt(matches[1]) +
		(matches[3] == "pm" ? 12 : 0) +
		":" +
		matches[2] +
		":00";

console.log(output);
// 22:23:00

console.log(new Date(parseInt(input)).toLocaleTimeString(navigator.language, {hour12: true, minute: '2-digit'}));
*/
