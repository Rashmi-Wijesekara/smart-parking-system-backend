const database = require('./database.json')

const getAllEmployees = () => {
	return database.employees
}

const getEmployeeById = (employeeId) => {
	return database.employees.find(
		(found) => found.id === employeeId
	);
}

module.exports = {
	getAllEmployees,
	getEmployeeById,
};