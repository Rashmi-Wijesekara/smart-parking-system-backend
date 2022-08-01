const mongoose = require("mongoose");
const model__employee = require("../mongodb/Employee-model");

// get full employee data
const getAllEmployees = async () => {
	return await model__employee.find(
		{},
		{ id: 1, name: 1, vehicleList: 1, phoneNo: 1 }
	);
};

// get employee's data
const getEmployeeById = async (employeeId) => {
	return await model__employee.find({ id: employeeId });
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
		{ id: emid },
		{ $pull: { vehicleList: veid } }
	);

	const updatedEmployee = await model__employee
		.find({ id: emid })
		.exec();

	return updatedEmployee;
};

// return the vehicle list of given employee
const getVehicleList = async (emid) => {
	const isEmployee = await model__employee
		.find({ id: emid })
		.exec();

	// invalid employee id
	if (isEmployee.length == 0) return "emid available";

	const vehicleList = await model__employee
		.find({ id: emid }, { vehicleList: 1 })
		.exec();

	return vehicleList;
};

const getEmployeeByVehicleId = async (veid) => {
	const employee = await model__employee.find(
		{ vehicleList: { $in: [veid] } },
		{ id: 1, name: 1, vehicleList: 1, phoneNo: 1 }
	);

	return employee
}

module.exports = {
	getAllEmployees,
	getEmployeeById,
	addNewEmployee,
	updateEmployee,
	addVehicle,
	removeVehicle,
	getVehicleList,
	getEmployeeByVehicleId,
};
