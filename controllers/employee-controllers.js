const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const service__employee = require("../services/employee-service");

const getAllEmployees = (req, res) => {
	const allEmployees = service__employee.getAllEmployees();

	res.send({
		status: "OK",
		data: allEmployees,
	});
};

const getEmployeeById = (req, res, next) => {
	const employeeId = req.params.emid;
	const employee =
		service__employee.getEmployeeById(employeeId);

	if (!employee)
		throw new HttpError(
			`could not find employee ID ${employeeId}`,
			404
		);
	res.json({
		status: "OK",
		data: employee,
	});
};

const addNewEmployee = (req, res) => {
	const { body } = req;
	const errors = validationResult(req);
	if (!errors.isEmpty())
		throw new HttpError(
			"Invalid inputs passed, please check your data",
			422
		);

	const employee = {
		name: body.name,
		phoneNo: body.phoneNo,
		email: body.email,
		vehicleList: body.vehicleList,
		password: body.password,
	};

	const addedEmployee =
		service__employee.addNewEmployee(employee);

	if (addedEmployee === "veid available") {
		throw new HttpError(
			`vehicle ID already available`,
			422
		);
	}
	res
		.status(201)
		.send({ status: "OK", data: addedEmployee });
};

// change password
const updateEmployee = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		throw new HttpError(
			"Invalid inputs passed, please check your data",
			422
		);

	const newPassword = req.body.password;
	const employeeId = req.params.emid;
	const updatedEmployee = service__employee.updateEmployee(
		employeeId,
		newPassword
	);

	if (!updatedEmployee)
		throw new HttpError(
			`could not find employee ID ${employeeId}`,
			404
		);

	res
		.status(201)
		.send({ status: "OK", data: updatedEmployee });
};

// add or remove a vehicle from the vehicle list of an employee
const updateVehicleList = (req, res) => {
	const type = req.params.type;
	const emid = req.params.emid;
	let updatedEmployee = null;

	const updatingVehicleId = req.body.vehicleId;
	if (!updatingVehicleId) {
		throw new HttpError(`vehicle ID is required`, 422);
	}

	if (type === "add") {
		updatedEmployee = service__employee.addVehicle(
			emid,
			updatingVehicleId
		);
	} else if (type === "remove") {
		updatedEmployee = service__employee.removeVehicle(
			emid,
			updatingVehicleId
		);
	}

	if (updatedEmployee === "emid available") {
		throw new HttpError(
			`could not find employee ID ${emid}`,
			404
		);
	} else if (updatedEmployee === "veid available") {
		throw new HttpError(
			`vehicle ID ${updatingVehicleId} already available`,
			422
		);
	} else if (updatedEmployee === "veid unavailable") {
		throw new HttpError(
			`could not find vehicle ID ${updatingVehicleId} in the given employee's vehicle list`,
			404
		);
	}

	res
		.status(201)
		.send({ status: "OK", data: updatedEmployee });
};

const getVehicleList = (req, res) => {
	const emid = req.params.emid;
	const vehicleList =
		service__employee.getVehicleList(emid);

	if (vehicleList === "emid available") {
		throw new HttpError(
			`could not find employee ID ${emid}`,
			404
		);
	}

	res.status(201).send({ status: "OK", data: vehicleList });
};

module.exports = {
	getAllEmployees,
	getEmployeeById,
	addNewEmployee,
	updateEmployee,
	updateVehicleList,
	getVehicleList,
};
