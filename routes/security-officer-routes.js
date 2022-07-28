const express = require("express");
const { check } = require("express-validator");

const controllers__securityOfficer = require("../controllers/security-officer-controllers")

const router = express.Router();


// GET api/security-officer/:soid
// get security officer data
router.get('/:soid', controllers__securityOfficer.getOfficerById);

// POST api/security-officer/
// add new security officer
router.post('/', controllers__securityOfficer.addOfficer)

// PATCH api/security-officer/:soid
router.patch('/:soid', controllers__securityOfficer.updateOfficer)


// GET api/security-officer/:soid/today
// get today shift type and start time
// router.get('/:soid/today', controllers__security__getOfficerTodayData)
