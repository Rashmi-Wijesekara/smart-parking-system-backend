const database = require('./database.json')
const {saveToDatabase} = require('./utils')

// **********************************************************************************
// check whether the given employee id is valid
const isAvailable = (employeeId) => {
	const result =
		database.employees.findIndex(
			(employee) => employee.id === employeeId
		) > -1;
	return result
}

// get the index of the given employee id
const employeeIndex = (employeeId) => {
	const index = database.employees.findIndex(employee => employee.id === employeeId)
	return index
}

const findIndex__vehicle = (veid, vehicleList) => {
	const result1 = vehicleList.findIndex(
		(vehicle) => vehicle === veid
	);
	return result1;
};

const isVehicleAvailable = (veid, findIndex__vehicle) => {
	let x =1
	const result =
		database.employees.findIndex((employee) => {
			let index = findIndex__vehicle(veid, employee.vehicleList);
			
			if(index > -1) 
				return index
		}) > -1;

	return result;
};

// ***************************************************************************************

// get full employee data
const getAllEmployees = () => {
	return database.employees
}

// get employee's data
const getEmployeeById = (employeeId) => {
	return database.employees.find(
		(found) => found.id === employeeId
	);
}

// add new employee
const addNewEmployee = (newEmployee) => {
	const isAlreadyAdded = database.employees.findIndex((employee)=> employee.email === newEmployee.email) > -1;

	if(isAlreadyAdded)
		return

	database.employees.push(newEmployee);
	saveToDatabase(database)
	return newEmployee
}

// change password
const updateEmployee = (employeeId, newPassword) => {
	const isAvailable = isAvailable(employeeId)

	// invalid employeeId
	if(!isAvailable)
		return

	const updatingEmployeeIndex = employeeIndex(employeeId)

	delete database.employees[updatingEmployeeIndex].password
	database.employees[updatingEmployeeIndex].password = newPassword

	saveToDatabase(database)
	return database.employees[updatingEmployeeIndex]
}

// add new vehicle to the vehicle list of given employee
const addVehicle = (
	emid,
	veid,
	isAvailable,
	employeeIndex,
	isVehicleAvailable,
	findIndex__vehicle
) => {
	const isAvailableResult = isAvailable(emid);
	const vehicleStatus = isVehicleAvailable(veid, findIndex__vehicle)

	// invalid employee id
	// already available vehicle id
	if (isAvailableResult === false){
		return "emid available"
	} else if (vehicleStatus === true){
		return "veid available"
	}

	const employeeIndexResult = employeeIndex(emid);
	const updatedEmployee =
		database.employees[employeeIndexResult];
		
	const updatedVehicleList = updatedEmployee.vehicleList;
	updatedVehicleList.push(veid);

	delete updatedEmployee.vehicleList;
	updatedEmployee.vehicleList = updatedVehicleList;

	saveToDatabase(database);
	return updatedEmployee;
};

const removeVehicle = (emid, veid) => {
	return;
};

module.exports = {
	isAvailable,
	employeeIndex,
	isVehicleAvailable,
	findIndex__vehicle,
	getAllEmployees,
	getEmployeeById,
	addNewEmployee,
	updateEmployee,
	addVehicle,
	removeVehicle,

};