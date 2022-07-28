const database = require("./database.json");
const { saveToDatabase } = require("./utils");
const DateTime = require("../models/date-time");

const getOfficerById = (soid) => {
	return database.securityOfficers.find(
		(found) => found.id === soid
	);
};

const addOfficer = (newOfficer) => {
	const isAlreadyAdded =
		database.securityOfficers.findIndex(
			(officer) => officer.email === newOfficer.email
		) > -1;

	if (isAlreadyAdded) return;
	
	database.securityOfficers.push(newOfficer);
	saveToDatabase(database);
	return newOfficer;
};

const updateOfficer = () => {
	return;
};

module.exports = {
	getOfficerById,
	addOfficer,
	updateOfficer,
};