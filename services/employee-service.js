const Employee = require("../database/Employee");
const { v4: uuid } = require("uuid");

const getAllEmployees = () => {
	const allEmployees = Employee.getAllEmployees();
	return allEmployees;
};

const getEmployeeById = (employeeId) => {
	const employee = Employee.getEmployeeById(employeeId);
	return employee;
};

const addNewEmployee = async (newEmployee) => {
	const employeeToInsert = {
		...newEmployee,
		id: uuid(), //generate unique id
	};

	const addedEmployee = await Employee.addNewEmployee(
		employeeToInsert,
		Employee.isVehicleAvailable,
		Employee.findIndex__vehicle
	)
	return addedEmployee
};

// change password
const updateEmployee = (employeeId, newPassword) => {
	const updatedEmployee = Employee.updateEmployee(
		employeeId,
		newPassword,
		Employee.isEmployeeAvailable,
		Employee.findIndex__employee
	);
	return updatedEmployee;
};

// updateVehicleList
// (employeeId, updatingVehicleId)
const addVehicle = (emid, veid) => {
	const updatedEmployee = Employee.addVehicle(
		emid,
		veid,
		Employee.isEmployeeAvailable,
		Employee.findIndex__employee,
		Employee.isVehicleAvailable,
		Employee.findIndex__vehicle
	);
	return updatedEmployee;
};

const removeVehicle = (emid, veid) => {
	const updatedEmployee = Employee.removeVehicle(
		emid,
		veid,
		Employee.isEmployeeAvailable,
		Employee.findIndex__employee,
		Employee.findIndex__vehicle
	);
	return updatedEmployee;
};

const getVehicleList = (emid) => {
	const vehicleList = Employee.getVehicleList(
		emid,
		Employee.isEmployeeAvailable,
		Employee.findIndex__employee
	);
	return vehicleList;
};

module.exports = {
	getAllEmployees,
	getEmployeeById,
	addNewEmployee,
	updateEmployee,
	addVehicle,
	removeVehicle,
	getVehicleList,
};
