const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema__shiftLog = new Schema({
	/*{
      "officerId": "123",
      "date": "2022-06-15",
      "startTime": "08:32 am",
      "endTime": "05:03 pm",
      "shiftType": "Day"
    }*/

	officerId: { type: String, required: true },
	date: { type: String, required: true },
	startTime: { type: String, required: true },
	endTime: { type: String, required: true},
	shiftType: { type: String, required: true}
})

module.exports = mongoose.model('ShiftLog', schema__shiftLog)
