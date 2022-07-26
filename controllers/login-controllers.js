const { validationResult} = require('express-validator')

const HttpError = require('../models/http-error')
const data = require('../sample-data/officer-data')

// api/login/123
const getOfficerById = (req, res, next) => {
	const officerId = req.params.oid
	const officer = data.find(found => found.id === officerId)

	if(!officer)
		throw new HttpError('Could not find an officer for the provided id', 404)
	
	res.json({officer})
}
exports.getOfficerById = getOfficerById
