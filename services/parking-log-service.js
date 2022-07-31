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

const getAllLogsById = async (emid) => {
	const logs = await ParkingLog.getAllLogsById(emid)
	return logs
}

module.exports = {
	getAllLogs,
	getLogsWithinGivenTime,
	addLog,
	getAllLogsById,
};