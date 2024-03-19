const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    roles: {
		type: [String],
		enum: ["user", "admin", "super_admin"],
		default: ["user"],
	},
    status: {
        type: [String],
        enum: ["approved", "pending", "declined"]
    },
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);