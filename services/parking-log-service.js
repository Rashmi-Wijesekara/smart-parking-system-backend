const ParkingLog = require('../database/ParkingLog')

const getAllLogs = () => {
	const allLogs = ParkingLog.getAllLogs()
	return allLogs
}

const getLogsWithinGivenTime = (date, from, to) => {
	const logs = ParkingLog.getLogsWithinGivenTime(date, from, to)
	return logs
}

const addLog = (emid, name, veid, status, date, time) => {
	const addedLog = Employee.addLog(emid, name, veid, status, date, time)
	return addedLog
}

module.exports = {
	getAllLogs,
	getLogsWithinGivenTime,
	addLog
}