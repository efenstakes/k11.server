// include external libraries
const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const staff_schema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    priviledge: {
        type: String,
        enum: ['SUPER_ADMIN', 'ADMIN', 'STAFF'],
        default: 'STAFF'
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: (mail) => {
            return validator.isEmail(mail)
        }
    },

    is_active: {
        type: Boolean,
        default: true
    }

})

// hash the password before saving a record
staff_schema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})


const staff = mongoose.model('Staff', staff_schema)

module.exports = staff