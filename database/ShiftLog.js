const database = require("./database.json");
const { saveToDatabase } = require("./utils");
const DateTime = require("../models/date-time");
const SecurityOfficer = require("./SecurityOfficer");

const getAllLogsById = (soid) => {
	return database.shiftLog.filter(
		(found) => found.officerId === soid
	);
};

// add start time
const addLog = (log, isOfficerAvailable) => {
	
	const isOfficerAvailableResult = isOfficerAvailable(log.officerId);
	if (!isOfficerAvailableResult) return;

	const type = DateTime.shiftType(log.startTime);
	const endTime = "---";
	const addingLog = {
		...log,
		endTime: endTime,
		shiftType: type,
	};
	database.shiftLog.push(addingLog);
	saveToDatabase(database);
	return addingLog;
};

// add end time
const updateLog = (soid, endTime, isOfficerAvailable) => {
	const isOfficerAvailableResult = isOfficerAvailable(soid);
	if (!isOfficerAvailableResult) return;

	const updatingLogIndex = database.shiftLog.findIndex((log) => {
		return (log.officerId === soid && log.endTime === "---")
	})

	if(updatingLogIndex === -1) return "no log found"

	delete database.shiftLog[updatingLogIndex].endTime
	database.shiftLog[updatingLogIndex].endTime = endTime

	saveToDatabase(database);
	return database.shiftLog[updatingLogIndex]
};

const getTodaysLog = () => {
	return;
};

module.exports = {
	getAllLogsById,
	addLog,
	updateLog,
	getTodaysLog,
};
