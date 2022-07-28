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

const updateOfficer = () => {
	return
}

module.exports = {
	getOfficerById,
	addOfficer,
	updateOfficer,
};