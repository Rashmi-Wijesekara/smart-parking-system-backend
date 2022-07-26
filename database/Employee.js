const database = require('./database.json')
const {saveToDatabase} = require('./utils')

const getAllEmployees = () => {
	return database.employees
}

const getEmployeeById = (employeeId) => {
	return database.employees.find(
		(found) => found.id === employeeId
	);
}

const addNewEmployee = (newEmployee) => {
	const isAlreadyAdded = database.employees.findIndex((employee)=> employee.email === newEmployee.email) > -1;

	if(isAlreadyAdded)
		return
	database.employees.push(newEmployee);
	saveToDatabase(database)
	return newEmployee
}

module.exports = {
	getAllEmployees,
	getEmployeeById,
	addNewEmployee,
};