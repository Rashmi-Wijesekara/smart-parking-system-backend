const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema__parkingLog = new Schema({
	/*{
		"employeeId": "000294392",
		"name": "Mohan Perera",
		"vehicleId": "CDB 4306",
		"status": "IN",
		"date": "2022-06-12",
		"time": "06:53 pm"
	}*/

	employeeId: { type: String, required: true },
	name: { type: String, required: true },
	vehicleId: { type: String, required: true },
	status: { type: String, required: true },
	date: { type: String, required: true },
	time: { type: String, required: true }
});

module.exports = mongoose.model('ParkingLog', schema__parkingLog)