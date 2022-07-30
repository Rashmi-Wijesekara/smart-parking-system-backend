const ShiftLog = require("../database/ShiftLog");

const getAllLogsById = async (soid) => {
	const allLogs = await ShiftLog.getAllLogsById(soid);
	return allLogs;
};

const addLog = async (log) => {
	const addedLog = await ShiftLog.addLog(log);
	return addedLog;
};

const updateLog = async (soid, endTime) => {
	const updatedLog = await ShiftLog.updateLog(
		soid,
		endTime
	);
	return updatedLog;
};

const getTodaysLog = async (soid) => {
	const todaysLog = await ShiftLog.getTodaysLog(soid);
	return todaysLog;
};

module.exports = {
	getAllLogsById,
	addLog,
	updateLog,
	getTodaysLog,
};
