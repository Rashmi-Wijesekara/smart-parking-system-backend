const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const service__securityOfficer = require("../services/security-officer-service")

const getOfficerById = (req, res) => {
	const soid = req.params.soid
	const officer = service__securityOfficer.getOfficerById(soid)

	if (!officer)
		throw new HttpError(
			`could not find officer ID ${soid}`,
			404
		);
	res.json({
		status: "OK",
		data: officer,
	});
}

const addOfficer = (req, res) => {
	const {body} = req;
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
		id: body.id
	};

	const addedOfficer = service__securityOfficer.addOfficer(officer)

	// if(addedOfficer === "soid available"){
	// 	throw new HttpError(
	// 		`vehicle ID already available`,
	// 		422
	// 	);
	// }

	res
		.status(201)
		.send({ status: "OK", data: addedOfficer });

	return;
};

const updateOfficer = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		throw new HttpError(
			"Invalid inputs passed, please check your data",
			422
		);

	const newPassword = req.body.password
	const soid = req.params.soid

	const updatedOfficer = service__securityOfficer.updateOfficer(soid, newPassword)
	
	if (!updatedOfficer)
		throw new HttpError(
			`could not find officer ID ${soid}`,
			404
		);
	res.json({
		status: "OK",
		data: updatedOfficer,
	});
};

module.exports = {
	getOfficerById,
	addOfficer,
	updateOfficer
}