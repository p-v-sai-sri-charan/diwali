const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },

    string: {
        type: String,
        required: true,
        unique:true
    },
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
