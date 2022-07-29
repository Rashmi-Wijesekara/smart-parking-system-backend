const ShiftLog = require('../database/ShiftLog')

const getAllLogsById = () => {
	return
}

const addLog = (log) => {
	const addedLog = ShiftLog.addLog(log)
	return addedLog
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