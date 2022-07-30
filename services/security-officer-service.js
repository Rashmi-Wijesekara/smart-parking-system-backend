const SecurityOfficer = require('../database/SecurityOfficer')
const { v4: uuid } = require("uuid");

const getOfficerById = async (soid) => {
	return await SecurityOfficer.getOfficerById(soid);
};

const addOfficer = async (newOfficer) => {
	// const officerToInsert = {
	// 	...newOfficer,
	// 	id: uuid(), //generate unique id
	// };

	const addedOfficer = await SecurityOfficer.addOfficer(
		newOfficer
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