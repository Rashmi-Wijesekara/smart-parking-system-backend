const Employee = require("../database/Employee");
const { v4: uuid } = require("uuid");

const getAllEmployees = async () => {
	const allEmployees = await Employee.getAllEmployees();
	return allEmployees;
};

const getEmployeeById = async (employeeId) => {
	const employee = await Employee.getEmployeeById(
		employeeId
	);
	return employee;
};

const addNewEmployee = async (newEmployee) => {
	const employeeToInsert = {
		...newEmployee,
		id: uuid(), //generate unique id
	};

	const addedEmployee = await Employee.addNewEmployee(
		employeeToInsert
	);
	return addedEmployee;
};

// change password
const updateEmployee = async (employeeId, newPassword) => {
	const updatedEmployee = await Employee.updateEmployee(
		employeeId,
		newPassword
	);
	return updatedEmployee;
};

// updateVehicleList
// (employeeId, updatingVehicleId)
const addVehicle = async (emid, veid) => {
	const updatedEmployee = await Employee.addVehicle(
		emid,
		veid
	);
	return updatedEmployee;
};

const removeVehicle = async (emid, veid) => {
	const updatedEmployee = await Employee.removeVehicle(
		emid,
		veid
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
