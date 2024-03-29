const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema__officer = new Schema({
	/*{
      "name": "Mahinda Weerasinghe",
      "phoneNo": "0331238864",
      "email": "mahindaw@mm.lk",
      "id": "123",
      "password": "qqquu"
    }*/

	name: { type: String, required: true },
	phoneNo: { type: String, required: true },
	email: { type: String, required: true },
	id: { type: String, required: true },
	password: { type: String, required: true }
});

module.exports = mongoose.model('Officer', schema__officer)