const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const service__employee = require("../services/employee-service");

const getAllEmployees = (req, res) => {
	const allEmployees = service__employee
		.getAllEmployees()
		.then((employees) => {
			res.send({
				status: "OK",
				data: employees,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

const getEmployeeById = (req, res, next) => {
	const employeeId = req.params.emid;
	const data = service__employee
		.getEmployeeById(employeeId)
		.then((employee) => {
			if (employee.length === 0)
				return next(
					new HttpError(
						`could not find employee ID ${employeeId}`,
						404
					)
				);
			res.json({
				status: "OK",
				data: employee,
			});
		});
};

const addNewEmployee = (req, res, next) => {
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

	const some = service__employee
		.addNewEmployee(employee)
		.then((addedEmployee) => {
			if (addedEmployee === "veid available") {
				return next(
					new HttpError(`vehicle ID already available`, 422)
				);
			} else if (addedEmployee === "emid available") {
				return next(
					new HttpError(
						`Employee email already available`,
						422
					)
				);
			} else if (addedEmployee === "db error") {
				return next(
					new HttpError(`DB connection error`, 500)
				);
			}

			return res
				.status(201)
				.send({ status: "OK", data: addedEmployee });
		})
		.catch((err) => {
			console.log(err);
		});
};

// change password
const updateEmployee = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		throw new HttpError(
			"Invalid inputs passed, please check your data",
			422
		);

	const newPassword = req.body.password;
	const employeeId = req.params.emid;
	const updatedOne = service__employee
		.updateEmployee(employeeId, newPassword)
		.then((updatedEmployee) => {
			if (updatedEmployee === "emid invalid")
				return next(
					new HttpError(
						`could not find employee ID ${employeeId}`,
						404
					)
				);

			res
				.status(201)
				.send({ status: "OK", data: updatedEmployee });
		});
};

// add or remove a vehicle from the vehicle list of an employee
const updateVehicleList = (req, res, next) => {
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

const addVehicle = (req, res, next) => {
	const emid = req.params.emid;
	const updatingVehicleId = req.body.vehicleId;

	if (!updatingVehicleId) {
		return next(
			new HttpError(`vehicle ID is required`, 422)
		);
	}

	const updated = service__employee
		.addVehicle(emid, updatingVehicleId)
		.then((updatedEmployee) => {
			if (updatedEmployee === "emid available") {
				return next(
					new HttpError(
						`could not find employee ID ${emid}`,
						404
					)
				);
			} else if (updatedEmployee === "veid available") {
				return next(
					new HttpError(
						`vehicle ID ${updatingVehicleId} already available`,
						422
					)
				);
			}
			res
				.status(201)
				.send({ status: "OK", data: updatedEmployee });
		});
};

const removeVehicle = (req, res, next) => {
	const emid = req.params.emid;
	const updatingVehicleId = req.body.vehicleId;

	if (!updatingVehicleId) {
		return next(
			new HttpError(`vehicle ID is required`, 422)
		);
	}
	const updated = service__employee
		.removeVehicle(emid, updatingVehicleId)
		.then((updatedEmployee) => {
			if (updatedEmployee === "emid available") {
				return next(
					new HttpError(
						`could not find employee ID ${emid}`,
						404
					)
				);
			} else if (updatedEmployee === "veid unavailable") {
				return next(
					new HttpError(
						`could not find vehicle ID ${updatingVehicleId} in the given employee's vehicle list`,
						404
					)
				);
			}
			res
				.status(201)
				.send({ status: "OK", data: updatedEmployee });
		});
};

const getVehicleList = (req, res, next) => {
	const emid = req.params.emid;
	const data = service__employee
		.getVehicleList(emid)
		.then((vehicleList) => {
			if (vehicleList === "emid available") {
				return next(
					new HttpError(
						`could not find employee ID ${emid}`,
						404
					)
				);
			}
			res
				.status(201)
				.send({ status: "OK", data: vehicleList });
		});
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
