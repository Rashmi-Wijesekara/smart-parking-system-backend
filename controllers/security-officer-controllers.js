const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const service__securityOfficer = require("../services/security-officer-service");

const getOfficerById = (req, res, next) => {
	const soid = req.params.soid;
	const data = service__securityOfficer
		.getOfficerById(soid)
		.then((officer) => {
			if (!officer)
				return next(
					new HttpError(
						`could not find officer ID ${soid}`,
						404
					)
				);
			res.json({
				status: "OK",
				data: officer,
			});
		});
};

const addOfficer = (req, res) => {
	const { body } = req;
	const errors = validationResult(req);
	if (!errors.isEmpty())
		throw new HttpError(
			"Invalid inputs passed, please check your data",
			422
		);

	const officer = {
		name: body.name,
		phoneNo: body.phoneNo,
		email: body.email,
		password: body.password,
		id: body.id,
	};

	const data = service__securityOfficer
		.addOfficer(officer)
		.then((addedOfficer) => {
			res
				.status(201)
				.send({ status: "OK", data: addedOfficer });
		});
};

const updateOfficer = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		throw new HttpError(
			"Invalid inputs passed, please check your data",
			422
		);

	const newPassword = req.body.password;
	const soid = req.params.soid;

	const data = service__securityOfficer
		.updateOfficer(soid, newPassword)
		.then((updatedOfficer) => {
			if (!updatedOfficer)
				return next(
					new HttpError(
						`could not find officer ID ${soid}`,
						404
					)
				);
			res.json({
				status: "OK",
				data: updatedOfficer,
			});
		});
};

module.exports = {
	getOfficerById,
	addOfficer,
	updateOfficer,
};
