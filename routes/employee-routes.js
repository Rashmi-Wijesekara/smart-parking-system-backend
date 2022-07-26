const express = require("express");
const { check } = require("express-validator");

const controllers__employee = require('../controllers/employee-controllers')

const router = express.Router();

// GET api/employee/
// get full list of all the employees
router.get("/", controllers__employee.getAllEmployees)

// GET api/employee/:emid
// get employee data
router.get("/:emid", controllers__employee.getEmployeeById)

// POST api/employee/
// add new employee
router.post("/", [
	check('name').not().isEmpty(),
	check('phoneNo').not().isEmpty(),
	check('email').not().isEmpty(),
	check('password').not().isEmpty(),
	check('vehicleList').isLength({min: 1})
], controllers__employee.addNewEmployee)

// PATCH api/employee/:emid
// change the password
router.patch("/:emid", [check('password').not().isEmpty()], controllers__employee.updateEmployee)

// PATCH api/employee/:emid/vehicles/:type
// add or remove a vehicle from the employee's vehicle list
router.patch(
	"/:emid/vehicles/:type",
	controllers__employee.updateVehicleList
);

// GET api/employee/:emid/vehicles
// get the full vehicle list
router.get(
	"/:emid/vehicles",
	controllers__employee.getVehicleList
);

module.exports = router