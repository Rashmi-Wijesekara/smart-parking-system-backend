const Employee = require('../database/Employee')

const getAllEmployees = () => {
	const allEmployees = Employee.getAllEmployees()
	return allEmployees
}

const getEmployeeById = (employeeId) => {
	const employee = Employee.getEmployeeById(employeeId)
	return employee
}

const addNewEmployee = () => {
	return;
}

const updateEmployee = () => {
	return;
}

// updateVehicleList
const addVehicle = () => {
	return;
}

const removeVehicle = () => {
	return;
}

const getVehicleList = () => {
	return;
}

module.exports = {
	getAllEmployees,
	getEmployeeById,
	addNewEmployee,
	updateEmployee,
	addVehicle,
	removeVehicle,
	getVehicleList,
};
