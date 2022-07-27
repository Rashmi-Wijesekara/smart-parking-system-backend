const express = require("express");
const { check } = require("express-validator");

const controllers__parkingLog = require('../controllers/parking-log-controllers')

const router = express.Router();

// GET api/parking-log/
// get full list of all the parking log entries
router.get("/", controllers__parkingLog.getAllLogs)

// GET api/parking-log/:date/:from/:to
// get log entries within the selected time range
router.get("/:date/:from/:to", controllers__parkingLog.getLogsWithinGivenTime)

// POST api/parking-log/
router.post("/", controllers__parkingLog.addLog)

module.exports = router;