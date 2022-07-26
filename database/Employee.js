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

const updateEmployee = (employeeId, newPassword) => {
	const isAvailable = database.employees.findIndex(
		(employee) => employee.id === employeeId
	) > -1;

	// invalid employeeId
	if(!isAvailable)
		return

	const updatingEmployeeIndex = database.employees.findIndex(employee => employee.id === employeeId)

	delete database.employees[updatingEmployeeIndex].password
	database.employees[updatingEmployeeIndex].password = newPassword

	saveToDatabase(database)
	return database.employees[updatingEmployeeIndex]
}

module.exports = {
	getAllEmployees,
	getEmployeeById,
	addNewEmployee,
	updateEmployee,
};