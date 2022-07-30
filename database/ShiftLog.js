const mongoose = require("mongoose");
const model__shiftLog = require("../mongodb/ShiftLog-model");
const model__officer = require("../mongodb/Officer-model");

const DateTime = require("../models/date-time");

const getAllLogsById = async (soid) => {
	return await model__shiftLog
		.find({ id: soid })
		.sort({ date: -1});
};

// add start time
const addLog = async (log) => {

	const isEmployee = await model__officer.find({id: log.officerId}).exec()
	if(isEmployee.length == 0) return

	const type = DateTime.shiftType(log.startTime);
	const endTime = "---";
	const l = {
		...log,
		endTime: endTime,
		shiftType: type
	};

	const addingLog = new model__shiftLog({
		officerId: l.officerId,
		date: l.date,
		startTime: l.startTime,
		endTime: l.endTime,
		shiftType: l.shiftType
	})

	await addingLog.save()
	return addingLog
};

// add end time
const updateLog = async (soid, endTime) => {
	const isOfficerAvailableResult = isOfficerAvailable(soid);
	if (!isOfficerAvailableResult) return;

	const updatingLogIndex = database.shiftLog.findIndex(
		(log) => {
			return (
				log.officerId === soid && log.endTime === "---"
			);
		}
	);

	if (updatingLogIndex === -1) return "no log found";

	delete database.shiftLog[updatingLogIndex].endTime;
	database.shiftLog[updatingLogIndex].endTime = endTime;

	saveToDatabase(database);
	return database.shiftLog[updatingLogIndex];
};

const getTodaysLog = async (soid) => {
	const isOfficerAvailableResult = isOfficerAvailable(soid);
	if (!isOfficerAvailableResult) return "no officer";

	const todaysLog = database.shiftLog.find((log) => {
		return (
			log.officerId === soid &&
			log.date === DateTime.getDate()
		);
	});

	return todaysLog;
};

module.exports = {
	getAllLogsById,
	addLog,
	updateLog,
	getTodaysLog,
};
