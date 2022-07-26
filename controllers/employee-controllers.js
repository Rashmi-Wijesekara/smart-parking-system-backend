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
	const addedEmployee = service__employee.addNewEmployee()
	res.send("adding new employee");
};

const updateEmployee = (req, res) => {
	const updatedEmployee = service__employee.updateEmployee()
	res.send("update employee " + req.params.emid);
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
