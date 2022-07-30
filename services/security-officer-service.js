const SecurityOfficer = require('../database/SecurityOfficer')
const ID = require("nodejs-unique-numeric-id-generator");

const getOfficerById = async (soid) => {
	return await SecurityOfficer.getOfficerById(soid);
};

const addOfficer = async (newOfficer) => {
	const officerToInsert = {
		...newOfficer,
		id: ID.generate(new Date().toJSON()) //generate unique id
	};

	const addedOfficer = await SecurityOfficer.addOfficer(
		officerToInsert
	);

	return addedOfficer;
};

// change password
const updateOfficer = async (soid, newPassword) => {
	const updatedOfficer =
		await SecurityOfficer.updateOfficer(
			soid,
			newPassword
		);

	return updatedOfficer;
};

module.exports = {
	getOfficerById,
	addOfficer,
	updateOfficer,
};