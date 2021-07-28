const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    registered: {
        type: Date,
        default: Date.now,
    },
    type: {
        type: String,
        default: 'user',
    },
});

module.exports = user = mongoose.model('user', UserSchema);
