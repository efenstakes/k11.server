// include external libraries
const mongoose = require('mongoose')


const vaccination_schema = mongoose.Schema({

    user_id: {
        type: String,
        required: true
    },

    staff_id: {
        type: String,
        required: true
    },

    station: {
        type: String,
        required: true
    },

    made_on: {
        type: Date,
        default: Date.now()
    },

    is_negative: {
        type: Boolean,
    },

    symptoms: {
        type: Array,
    }

})

// do sth before saving a record
vaccination_schema.pre('save', function(next) { 
    next()
})

// delete any account data which may need deleting
vaccination_schema.pre('remove', function() {})

const vaccination = mongoose.model('Test', vaccination_schema)

module.exports = vaccination