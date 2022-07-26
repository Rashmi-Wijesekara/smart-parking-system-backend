const Employee = require('../database/Employee')

const getAllEmployees = () => {
	const allEmployees = Employee.getAllEmployees()
	return allEmployees
}

const getEmployeeById = (employeeId) => {
	const employee = Employee.getEmployeeById(employeeId)
	return employee
}

const addNewEmployee = (newEmployee) => {
	const employeeToInsert = {
		...newEmployee,
		id: "111"
	}

	const addedEmployee = Employee.addNewEmployee(employeeToInsert)
	return addedEmployee
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
