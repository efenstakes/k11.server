// include external libraries
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const { generate_code } = require('../utils/utils')


const AccountSchema = mongoose.Schema({

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

    type: {
        type: String,
        enum: ['SUPER_ADMIN', 'ADMIN', 'STAFF', 'USER'],
        default: 'USER'
    },

})

// hash the password before saving a record
UserSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10)
    
    let code = generate_code()

    this.verified = { code, done: false }    
    next()
})

// delete any account data which may need deleting
AccountSchema.pre('remove', function() {})

const Account = mongoose.model('Account', AccountSchema)

module.exports = Account