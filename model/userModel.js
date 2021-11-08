const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstName: String,
	LastName: String,
	email: {
		type: String,
		required: [true, "no email input"],
		unique: [true, "duplicate email input"]
		},
	password: {
		type: String,
		required: [true, "no password input"]
	}
})


const User = mongoose.model('User', UserSchema);

module.exports = User;