const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    map: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    landing: {
        type: String,
        required: true
    }
})

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;