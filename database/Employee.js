const database = require("./database.json");
const { saveToDatabase } = require("./utils");

// **********************************************************************************
// check whether the given employee id is valid
const isEmployeeAvailable = (employeeId) => {
	const result =
		database.employees.findIndex(
			(employee) => employee.id === employeeId
		) > -1;
	return result;
};

// get the index of the given employee id
const findIndex__employee = (employeeId) => {
	const index = database.employees.findIndex(
		(employee) => employee.id === employeeId
	);
	return index;
};

const findIndex__vehicle = (veid, vehicleList) => {
	const result1 = vehicleList.findIndex(
		(vehicle) => vehicle === veid
	);
	// console.log(result1+ " = find index vehicle");
	return result1;
};

// true -> already available vehicle
const isVehicleAvailable = (veid, findIndex__vehicle) => {
	let found = false
	const result =
		database.employees.findIndex((employee) => {
			let index = findIndex__vehicle(
				veid,
				employee.vehicleList
			);
			
			if (index > -1) {
				// console.log(index + "find index should stop after found")
				found = true
			}
		}) > -1;
	// console.log(result + " find index vehicle returned");

	return found;
};

// ***************************************************************************************

// get full employee data
const getAllEmployees = () => {
	return database.employees;
};

// get employee's data
const getEmployeeById = (employeeId) => {
	return database.employees.find(
		(found) => found.id === employeeId
	);
};

// add new employee
const addNewEmployee = (
	newEmployee,
	isVehicleAvailable,
	findIndex__vehicle
) => {
	const isAlreadyAdded =
		database.employees.findIndex(
			(employee) => employee.email === newEmployee.email
		) > -1;

	if (isAlreadyAdded) return;

	let isVehicleAvailableResult = false;

	const checkVehicleStatus =
		newEmployee.vehicleList.findIndex((vehicle) => {
			const vehicleStatus = isVehicleAvailable(
				vehicle,
				findIndex__vehicle
			);
			// console.log(vehicle + "=" + vehicleStatus);
			if(vehicleStatus === true) {
				// this vehicle is already added by another employee
				isVehicleAvailableResult = true
			}
		});
	
	// console.log(isVehicleAvailableResult)
	if(isVehicleAvailableResult){
		return "veid available"
	}

	database.employees.push(newEmployee);
	saveToDatabase(database);
	return newEmployee;
};

// change password
const updateEmployee = (
	employeeId,
	newPassword,
	isEmployeeAvailable,
	findIndex__employee
) => {
	const isEmployeeAvailableResult =
		isEmployeeAvailable(employeeId);

	// invalid employeeId
	if (!isEmployeeAvailableResult) return;

	const updatingEmployeeIndex =
		findIndex__employee(employeeId);

	delete database.employees[updatingEmployeeIndex].password;
	database.employees[updatingEmployeeIndex].password =
		newPassword;

	saveToDatabase(database);
	return database.employees[updatingEmployeeIndex];
};

// add new vehicle to the vehicle list of given employee
const addVehicle = (
	emid,
	veid,
	isEmployeeAvailable,
	findIndex__employee,
	isVehicleAvailable,
	findIndex__vehicle
) => {
	const isEmployeeAvailableResult =
		isEmployeeAvailable(emid);
	const vehicleStatus = isVehicleAvailable(
		veid,
		findIndex__vehicle
	);

	// invalid employee id
	// already available vehicle id
	if (isEmployeeAvailableResult === false) {
		return "emid available";
	} else if (vehicleStatus === true) {
		return "veid available";
	}

	const employeeIndexResult = findIndex__employee(emid);
	const updatedEmployee =
		database.employees[employeeIndexResult];

	const updatedVehicleList = updatedEmployee.vehicleList;
	updatedVehicleList.push(veid);

	delete updatedEmployee.vehicleList;
	updatedEmployee.vehicleList = updatedVehicleList;

	saveToDatabase(database);
	return updatedEmployee;
};

// remove given vehicle from employee's vehicle list
const removeVehicle = (
	emid,
	veid,
	isEmployeeAvailable,
	findIndex__employee,
	findIndex__vehicle
) => {
	let found = false;

	const isEmployeeAvailableResult =
		isEmployeeAvailable(emid);
	
	// invalid employee id
	if (isEmployeeAvailableResult === false) {
		return "emid available";
	}

	const employeeIndex = findIndex__employee(emid)
	const updatingEmployee = database.employees[employeeIndex]
	let updatingVehicleList = updatingEmployee.vehicleList

	let index = findIndex__vehicle(
		veid, updatingVehicleList
	)

	if (index <= -1) {
		return "veid unavailable";
	}

	deleted = updatingVehicleList.splice(index, 1)

	// new vehicle list
	const updatedVehicleList = updatingEmployee.vehicleList

	// update the new vehicle list in the database instance
	database.employees[employeeIndex].vehicleList = updatedVehicleList

	saveToDatabase(database);
	return database.employees[employeeIndex];
};

// return the vehicle list of given employee
const getVehicleList =(
	emid,
	isEmployeeAvailable,
	findIndex__employee
) => {
	const isEmployeeAvailableResult =
		isEmployeeAvailable(emid);

	// invalid employee id
	if (isEmployeeAvailableResult === false) {
		return "emid available";
	}

	const employeeIndex = findIndex__employee(emid);

	return database.employees[employeeIndex].vehicleList
}

module.exports = {
	isEmployeeAvailable,
	findIndex__employee,
	isVehicleAvailable,
	findIndex__vehicle,
	getAllEmployees,
	getEmployeeById,
	addNewEmployee,
	updateEmployee,
	addVehicle,
	removeVehicle,
	getVehicleList
};
