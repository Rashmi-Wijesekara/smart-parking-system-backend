const ShiftLog = require("../database/ShiftLog");
const SecurityOfficer = require("../database/SecurityOfficer");

const getAllLogsById = (soid) => {
	const allLogs = ShiftLog.getAllLogsById(soid);
	return allLogs;
};

const addLog = (log) => {
	const addedLog = ShiftLog.addLog(
		log,
		SecurityOfficer.isOfficerAvailable
	);
	return addedLog;
};

const updateLog = (soid, endTime) => {
	const updatedLog = ShiftLog.updateLog(
		soid,
		endTime,
		SecurityOfficer.isOfficerAvailable
	);
	return updatedLog
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
