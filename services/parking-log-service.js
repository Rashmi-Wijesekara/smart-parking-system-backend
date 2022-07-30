const ParkingLog = require('../database/ParkingLog')

const getAllLogs = async () => {
	const allLogs = await ParkingLog.getAllLogs();
	return allLogs
}

const getLogsWithinGivenTime = async (date, from, to) => {
	const logs = await ParkingLog.getLogsWithinGivenTime(
		date,
		from,
		to
	);
	return logs;
};

const addLog = async (log) => {
	const addedLog = await ParkingLog.addLog(log);
	return addedLog;
};

module.exports = {
	getAllLogs,
	getLogsWithinGivenTime,
	addLog
}