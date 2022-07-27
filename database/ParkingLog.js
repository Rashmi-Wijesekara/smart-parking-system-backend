const database = require('./database.json')
const {saveToDatabase} = require('./utils')

const getAllLogs = () => {
	return database.parkingLog
}

const getLogsWithinGivenTime = () => {
	return
}

const addLog = () => {
	return
}

module.exports = {
	getAllLogs,
	getLogsWithinGivenTime,
	addLog
}