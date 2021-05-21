// include external libraries
const mongoose = require('mongoose')


const test_schema = mongoose.Schema({

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
test_schema.pre('save', function(next) { 
    next()
})

// delete any account data which may need deleting
test_schema.pre('remove', function() {})

const Test = mongoose.model('Test', test_schema)

module.exports = Test