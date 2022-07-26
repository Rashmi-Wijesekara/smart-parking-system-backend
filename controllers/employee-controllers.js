const {validationResult} = require('express-validator')

const HttpError = require("../models/http-error");
const service__employee = require("../services/employee-service")

const getAllEmployees = (req, res) => {
	const allEmployees = service__employee.getAllEmployees()

	res.send({
		status: "OK",
		data: allEmployees
	});
};

const getEmployeeById = (req, res, next) => {
	const employeeId = req.params.emid
	const employee = service__employee.getEmployeeById(employeeId)

	if(!employee)
		throw new HttpError(
			`could not find employee for id-${employeeId}`,
			404
		);
	res.json({
		status: "OK",
		data: employee
	});
};

const addNewEmployee = (req, res) => {
	const {body} = req
	const errors = validationResult(req)
	if(!errors.isEmpty())
		throw new HttpError('Invalid inputs passed, please check your data', 422)
	
	const employee = {
		name: body.name,
		phoneNo: body.phoneNo,
		email: body.email,
		vehicleList : body.vehicleList,
		password : body.password
	}

	const addedEmployee = service__employee.addNewEmployee(employee)
	res.status(201).send({status: 'OK', data: addedEmployee});
};

// change password
const updateEmployee = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		throw new HttpError(
			"Invalid inputs passed, please check your data",
			422
		);
	
	const newPassword = req.body.password
	const employeeId = req.params.emid
	const updatedEmployee = service__employee.updateEmployee(employeeId, newPassword)

	if (!updatedEmployee)
		throw new HttpError(
			`could not find employee for id-${employeeId}`,
			404
		);

	res
		.status(201)
		.send({ status: "OK", data: updatedEmployee });
};

const updateVehicleList = (req, res) => {
	const type = req.params.type
	let updatedVehicleList

	if(type === "add"){
		updatedVehicleList = service__employee.addVehicle()
	}else if(type === "remove"){
		updatedVehicleList = service__employee.removeVehicle()
	}

	res.send(
		`${req.params.type} new vehicle to ${req.params.emid}`
	);
};

const getVehicleList = (req, res) => {
	const vehicleList = service__employee.getVehicleList
	res.send("get the vehicle list of " + req.params.emid);
};

module.exports = {
	getAllEmployees,
	getEmployeeById,
	addNewEmployee,
	updateEmployee,
	updateVehicleList,
	getVehicleList
};
