const SecurityOfficer = require('../database/SecurityOfficer')
const { v4: uuid } = require("uuid");

const getOfficerById = () => {
	return
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