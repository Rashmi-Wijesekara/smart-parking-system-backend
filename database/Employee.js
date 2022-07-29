const mongoose = require("mongoose");
const model__employee = require("../mongodb/models/Employee-model");

const database = require("./database.json");
const { saveToDatabase } = require("./utils");

// **********************************************************************************
// check whether the given employee id is valid
const isEmployeeAvailable = (employeeId) => {
	// const result =
	// 	database.employees.findIndex(
	// 		(employee) => employee.id === employeeId
	// 	) > -1;
	// return result;

	const result = model__employee.findOne({
		id: employeeId,
	});

	if (result) return true;
	else return false;
};

// get the index of the given employee id
const findIndex__employee = (employeeId) => {
	const index = database.employees.findIndex(
		(employee) => employee.id === employeeId
	);
	return index;
};

const findIndex__vehicle = (veid, vehicleList) => {
	const result1 = vehicleList.findIndex(
		(vehicle) => vehicle === veid
	);
	return result1;
};

// true -> already available vehicle
const isVehicleAvailable = (veid, findIndex__vehicle) => {
	// let found = false
	// const result =
	// 	database.employees.findIndex((employee) => {
	// 		let index = findIndex__vehicle(
	// 			veid,
	// 			employee.vehicleList
	// 		);

	// 		if (index > -1) {
	// 			found = true
	// 		}
	// 	}) > -1;

	let found = false;

	const result = model__employee.findOne({
		vehicleList: { $all: [veid] },
	});
	console.log(result);

	return found;
};

// ***************************************************************************************

// get full employee data
const getAllEmployees = async () => {
	return await model__employee.find();
};

// get employee's data
const getEmployeeById = (employeeId) => {
	return model__employee.find({ id: employeeId });
};

// add new employee
const addNewEmployee = async (newEmployee) => {
	const employee = new model__employee({
		name: newEmployee.name,
		phoneNo: newEmployee.phoneNo,
		email: newEmployee.email,
		vehicleList: newEmployee.vehicleList,
		password: newEmployee.password,
		id: newEmployee.id,
	});

	const isAlreadyAdded = await model__employee
		.find({ email: newEmployee.email })
		.exec();

	if (isAlreadyAdded.length > 0) {
		return "emid available";
	}

	const status = await model__employee.where({
		vehicleList: { $in: [employee.vehicleList[0]] },
	});

	if (status.length > 0) {
		// given vehicle id is already added by another employee
		return "veid available";
	}

	try {
		await employee.save();
	} catch (e) {
		console.log(e);
		return "db error";
	}
	return employee;
};

// change password
const updateEmployee = async (employeeId, newPassword) => {
	const isEmployee = await model__employee
		.find({ id: employeeId })
		.exec();

	if (isEmployee.length == 0) return "emid invalid";

	await model__employee.updateOne(
		{ id: employeeId },
		{ $set: { password: newPassword } }
	);

	const updatedEmployee = await model__employee
		.find({ id: employeeId })
		.exec();

	return updatedEmployee;
};

// add new vehicle to the vehicle list of given employee
const addVehicle = async (emid, veid) => {
	const isEmployee = await model__employee
		.find({ id: emid })
		.exec();

	// invalid employee id
	if (isEmployee.length == 0) return "emid available";

	const status = await model__employee.where({
		vehicleList: { $in: [veid] },
	});

	// vehicle id already added
	if (status.length > 0) return "veid available";

	await model__employee.updateOne(
		{ id: emid },
		{ $push: { vehicleList: veid } }
	);

	const updatedEmployee = await model__employee
		.find({ id: emid })
		.exec();

	return updatedEmployee;
};

// remove given vehicle from employee's vehicle list
const removeVehicle = async (emid, veid) => {

	const isEmployee = await model__employee
		.find({ id: emid })
		.exec();

	// invalid employee id
	if (isEmployee.length == 0) return "emid available";

	const status = await model__employee.where({
		vehicleList: { $in: [veid] },
	});

	// vehicle id not available
	if (status.length === 0) return "veid unavailable";

	await model__employee.updateOne(
		{id: emid},
		{$pull: {vehicleList: veid}}
	)

	const updatedEmployee = await model__employee
		.find({ id: emid })
		.exec();

	return updatedEmployee
};

// return the vehicle list of given employee
const getVehicleList = (
	emid,
	isEmployeeAvailable,
	findIndex__employee
) => {
	const isEmployeeAvailableResult =
		isEmployeeAvailable(emid);

	// invalid employee id
	if (isEmployeeAvailableResult === false) {
		return "emid available";
	}

	const employeeIndex = findIndex__employee(emid);

	return database.employees[employeeIndex].vehicleList;
};

module.exports = {
	isEmployeeAvailable,
	findIndex__employee,
	isVehicleAvailable,
	findIndex__vehicle,
	getAllEmployees,
	getEmployeeById,
	addNewEmployee,
	updateEmployee,
	addVehicle,
	removeVehicle,
	getVehicleList,
};
