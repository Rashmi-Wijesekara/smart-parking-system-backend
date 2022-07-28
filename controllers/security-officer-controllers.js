const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const service__securityOfficer = require("../services/security-officer-service")

const getOfficerById = (req, res) => {
	return
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
		password: body.password
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
	return;
};

module.exports = {
	getOfficerById,
	addOfficer,
	updateOfficer
}