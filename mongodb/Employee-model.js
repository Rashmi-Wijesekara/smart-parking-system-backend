const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema__employee = new Schema({
	/*{
      "id": "000294392",
      "name": "Mohan Perera",
      "phoneNo": "0778435221",
      "email": "mohanp@mm.lk",
      "password": "1234",
      "vehicleList": [
        "CDB 4306",
        "ADS 2113",
        "SDD 4400"
      ]
    }*/

	name: { type: String, required: true },
	phoneNo: { type: String, required: true },
	email: { type: String, required: true },
	vehicleList: {
		type: Array,
		default: [],
	},
	password: { type: String, required: true },
	id: { type: String, required: true }
});

module.exports = mongoose.model('Employee', schema__employee)