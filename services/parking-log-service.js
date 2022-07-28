const ParkingLog = require('../database/ParkingLog')

const getAllLogs = () => {
	const allLogs = ParkingLog.getAllLogs()
	return allLogs
}

const getLogsWithinGivenTime = (date, from, to) => {
	const logs = ParkingLog.getLogsWithinGivenTime(date, from, to)
	return logs
}

const addLog = (log) => {
	const addedLog = ParkingLog.addLog(log)
	return addedLog
}

module.exports = {
	getAllLogs,
	getLogsWithinGivenTime,
	addLog
}