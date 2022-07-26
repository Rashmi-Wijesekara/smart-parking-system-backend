const express = require("express");
const { check } = require("express-validator");

const controllers__employee = require('../controllers/employee-controllers')

const router = express.Router();

// GET api/employee/
router.get("/", controllers__employee.getAllEmployees)

// GET api/employee/:emid
router.get("/:emid", controllers__employee.getEmployeeById)

// POST api/employee/
router.post("/", [
	check('name').not().isEmpty(),
	check('phoneNo').not().isEmpty(),
	check('email').not().isEmpty(),
	check('password').not().isEmpty(),
	check('vehicleList').isLength({min: 1})
], controllers__employee.addNewEmployee)

// PATCH api/employee/:emid
router.patch("/:emid", [check('password').not().isEmpty()], controllers__employee.updateEmployee)

// PATCH api/employee/vehicles/:type/:emid
router.patch("/vehicles/:type/:emid", controllers__employee.updateVehicleList)

// GET api/employee/vehicles/:emid
router.get("/vehicles/:emid", controllers__employee.getVehicleList)

module.exports = router