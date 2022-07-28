const express = require("express");
const { check } = require("express-validator");

const controllers__securityOfficer = require("../controllers/security-officer-controllers")

const router = express.Router();

// POST api/security-officer/
// add new security officer
router.post('/', [
	check('name').not().isEmpty(),
	check('password').not().isEmpty(),
	check('email').not().isEmpty(),
	check('phoneNo').not().isEmpty()
], controllers__securityOfficer.addOfficer)

// GET api/security-officer/:soid
// get security officer data
router.get('/:soid', controllers__securityOfficer.getOfficerById);

// PATCH api/security-officer/:soid
router.patch('/:soid', controllers__securityOfficer.updateOfficer)


// GET api/security-officer/:soid/today
// get today shift type and start time
// router.get('/:soid/today', controllers__security__getOfficerTodayData)

module.exports = router;