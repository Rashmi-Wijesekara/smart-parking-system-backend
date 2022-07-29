const database = require("./database.json");
const { saveToDatabase } = require("./utils");
const DateTime = require("../models/date-time");

const getAllLogsById = () => {
	return
}

const addLog = (log) => {
	const type = DateTime.shiftType(log.startTime)

	const addingLog = {...log, shiftType: type}
	database.shiftLog.push(addingLog);
	saveToDatabase(database);
	return addingLog;
}

const updateLog = () => {
	return
}

const getTodaysLog = () => {
	return
}

module.exports = {
	getAllLogsById,
	addLog,
	updateLog,
	getTodaysLog,
};