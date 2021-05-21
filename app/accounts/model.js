// include external libraries
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const { generate_code } = require('../utils/utils')


const account_schema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: (mail) => {
            return validator.isEmail(mail)
        }
    },

    phone: {
        type: String,
        required: false
    },

    joined_on: {
        type: Date,
        default: Date.now()
    },

    verified: {
        code: { type: String },
        issued_at: { 
            type: Date, 
            default: Date.now(),
        },
        done: { type: Boolean, default: false }
    },

})

// hash the password before saving a record
account_schema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10)
    
    let code = generate_code()

    this.verified = { code, done: false }    
    next()
})

// delete any account data which may need deleting
account_schema.pre('remove', function() {})

const account = mongoose.model('Account', account_schema)

module.exports = account