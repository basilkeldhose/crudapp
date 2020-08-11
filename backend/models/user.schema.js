const mongoose = require("mongoose")
var User = mongoose.model('User', {
    name: {
        type: String
    },
    address: {
        type: String
    },
    location: {
        type: String
    },
    phone: {
        type: Number
    }
});


module.exports =    { User }