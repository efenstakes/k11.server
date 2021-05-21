// include external libraries
const mongoose = require('mongoose')


const location_schema = mongoose.Schema({

    user_id: {
        type: String,
        required: true
    },

    lat: {
        type: String,
        required: true
    },

    lng: {
        type: String,
        required: true
    },
    
    city: {
        type: String,
    },

    country: {
        type: String,
    },

    added_on: {
        type: Date,
        default: Date.now()
    },


})

// do sth before saving a record
location_schema.pre('save', function(next) { 
    next()
})

// delete any account data which may need deleting
location_schema.pre('remove', function() {})

const location = mongoose.model('Location', location_schema)

module.exports = location