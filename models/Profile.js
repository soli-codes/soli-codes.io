const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    group: [
        {
            type: [String],
        },
    ],
    about: {
        type: String,
    },
    social: {
        youtube: {
            type: String,
        },
        twitch: {
            type: String,
        },
        twitter: {
            type: String,
        },
    },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
