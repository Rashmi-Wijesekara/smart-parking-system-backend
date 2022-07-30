const mongoose = require("mongoose");
const model__officer = require("../mongodb/Officer-model");

const DateTime = require("../models/date-time");

const getOfficerById = async (soid) => {
	return await model__officer.find({ id: soid });
};

const addOfficer = async (newOfficer) => {
	const isAlreadyAdded = await model__officer
		.find({ email: newOfficer.email })
		.exec();

	if (isAlreadyAdded.length > 0) {
		return;
	}

	const officer = new model__officer({
		name: newOfficer.name,
		phoneNo: newOfficer.phoneNo,
		email: newOfficer.email,
		password: newOfficer.password,
		id: newOfficer.id,
	});

	await officer.save();
	return officer
};

const updateOfficer = async (soid, newPassword) => {
	
	const isOfficer = await model__officer
		.find({ id: soid })
		.exec();
	if(isOfficer.length == 0)return;

	await model__officer.updateOne(
		{ id: soid },
		{ $set: { password: newPassword } }
	);

	const updatedOfficer = await model__officer
		.find({ id: soid })
		.exec();

	return updatedOfficer
};

module.exports = {
	getOfficerById,
	addOfficer,
	updateOfficer,
};
