const HttpError = require("../models/http-error");
// const data

const getAllEmployees = (req, res) => {
	const emid = req.params.emid;

	res.send("get all employee data");
};

const getEmployeeById = (req, res) => {
	res.send("get employee data " + req.params.emid);
};

const addNewEmployee = (req, res) => {
	res.send("adding new employee");
};

const updateEmployee = (req, res) => {
	res.send("update employee " + req.params.emid);
};

const updateVehicleList = (req, res) => {
	res.send(
		`${req.params.type} new vehicle to ${req.params.emid}`
	);
};

const getVehicleList = (req, res) => {
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
