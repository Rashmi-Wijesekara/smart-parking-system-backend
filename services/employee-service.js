const Employee = require('../database/Employee')
const { v4: uuid } = require("uuid")

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
		id: uuid() //generate unique id
	}

	const addedEmployee = Employee.addNewEmployee(employeeToInsert)
	return addedEmployee
}

// change password
const updateEmployee = (employeeId, newPassword) => {
	const updatedEmployee = Employee.updateEmployee(employeeId, newPassword)
	return updatedEmployee;
}

// updateVehicleList
// (employeeId, updatingVehicleId)
const addVehicle = (emid, veid) => {
	const updatedEmployee = Employee.addVehicle(
		emid,
		veid,
		Employee.isAvailable,
		Employee.employeeIndex,
		Employee.isVehicleAvailable,
		Employee.findIndex__vehicle
	);
	return updatedEmployee
};

const removeVehicle = (emid, veid) => {
	const updatedEmployee = Employee.removeVehicle(emid, veid)
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
