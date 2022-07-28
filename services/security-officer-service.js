const SecurityOfficer = require('../database/SecurityOfficer')
const { v4: uuid } = require("uuid");

const getOfficerById = (soid) => {
	return SecurityOfficer.getOfficerById(soid)
}

const addOfficer = (newOfficer) => {
	// const officerToInsert = {
	// 	...newOfficer,
	// 	id: uuid(), //generate unique id
	// };

	const addedOfficer = SecurityOfficer.addOfficer(
		newOfficer
	)

	return addedOfficer
}

// change password
const updateOfficer = (soid, newPassword) => {
	const updatedOfficer = SecurityOfficer.updateOfficer(
		soid,
		newPassword,
		SecurityOfficer.isOfficerAvailable,
		SecurityOfficer.findIndex__officer
	)

	return updatedOfficer
}

module.exports = {
	getOfficerById,
	addOfficer,
	updateOfficer,
};