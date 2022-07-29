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

const updateLog = () => {
	return;
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
