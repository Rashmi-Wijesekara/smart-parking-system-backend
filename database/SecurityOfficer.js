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

const updateOfficer = (
	soid,
	newPassword,
	isOfficerAvailable,
	findIndex__officer
) => {
	const isOfficerAvailableResult = isOfficerAvailable(soid)

	if(!isOfficerAvailableResult) return

	const updatingOfficerIndex = findIndex__officer(soid)

	delete database.securityOfficers[updatingOfficerIndex].password

	database.securityOfficers[updatingOfficerIndex].password = newPassword
	saveToDatabase(database);

	return database.securityOfficers[updatingOfficerIndex]
};

// check whether the given employee id is valid
const isOfficerAvailable = (soid) => {
	const result =
		database.securityOfficers.findIndex(
			(officer) => officer.id === soid
		) > -1;
	return result;
};

// get the index of the given employee id
const findIndex__officer = (soid) => {
	const index = database.securityOfficers.findIndex(
		(officer) => officer.id === soid
	);
	return index;
};

module.exports = {
	getOfficerById,
	addOfficer,
	updateOfficer,
	isOfficerAvailable,
	findIndex__officer,
};
