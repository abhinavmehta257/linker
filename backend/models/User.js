const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type:String
    },
    name: {
        type:String
    },
    email: {
        type:String
    },
    password: {
        type:String
    },
    avatar: {
        type:String
    },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);