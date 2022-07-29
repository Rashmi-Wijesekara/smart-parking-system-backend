const express = require("express");
const { check } = require("express-validator");

const controllers__shiftLog = require('../controllers/shift-log-controllers')

const router = express.Router();

// GET api/security-officer/shift-log/:soid
// get all the log entries for the given security officer
router.get('/:soid', controllers__shiftLog.getAllLogsById)

// POST api/security-officer/shift-log/:soid
// add a new log entry for the given security officer (shift start time)
router.post("/:soid", [
		check("date").not().isEmpty(),
		check("startTime").not().isEmpty(),
	],
	controllers__shiftLog.addLog
);

// PATCH api/security-officer/shift-log/:soid
// update the shift end time in the last entry for the given security officer
router.patch('/:soid', [
	check("endTime").not().isEmpty()], controllers__shiftLog.updateLog)

// GET api/security-officer/shift-log/:soid/today
// get today shift type and start time
router.get('/:soid/today', controllers__shiftLog.getTodaysLog)

module.exports = router