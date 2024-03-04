const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
		type: [String],
		enum: ["user", "admin", "super_admin"],
		default: ["user"],
	},
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);