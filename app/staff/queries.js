const { GraphQLString } = require('graphql')
const bcrypt = require('bcrypt')


const staff_type = require('./type')
const staff_model = require('./model')
const { generate_access_token, generate_refresh_token } = require('../utils/auth')



// add staff
const add_staff = {
    type: staff_type,
    args: {
        name: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        phone: {
            type: GraphQLString,
        },
        password: {
            type: GraphQLString,
        },
        priviledge: {
            type: GraphQLString,
        },
    },
    async resolve(context, args, { user }) {
        // check if the one adding is authed
        if( !user ) return null
        // check if the one adding is an admin
        if ( user.priviledge != 'ADMIN' ) return null

        const staff = await new staff_model(args).save()

        // sth went wrong
        if ( staff.$isEmpty() ) return null

        return {
            ...staff,
        }
    }
}



// login
const login_staff = {
    type: staff_type,
    args: {
        email: {
            type: GraphQLString,
        },
        password: {
            type: GraphQLString,
        },
    },
    async resolve(context, {email, password}) {
        // check if user exists 
        let staff = await staff_model.findOne({ email }).exec()

        // details were wrong
        if ( staff.$isEmpty() ) return null

        // check if passwords match
        let match = await bcrypt.compare(password, staff.password)

        // if passwords dont match return
        if ( !match ) return null

        const access_token = generate_access_token(staff)
        const refresh_token = generate_refresh_token(staff)
        
        return {
            ...staff.toObject(),
            access_token,
            refresh_token,
        }
    }
}



// update profile
const update_staff_profile = {
    type: staff_type,
    args: {
        email: {
            type: GraphQLString,
        },
        phone: {
            type: GraphQLString,
        },
    },
    async resolve(context, args, { user }) {
        // check if authenticated
        if( !user ) return null

        // check if user exists 
        let staff = await staff_model.findByIdAndUpdate(user._id, { ...args })

        // sth went wrong
        if ( staff.$isEmpty() ) return null
 
        return {
            ...staff.toObject()
        }
    }
}




// update password
const update_staff_password = {
    type: staff_type,
    args: {
        old_password: {
            type: GraphQLString,
        },
        password: {
            type: GraphQLString,
        },
    },
    async resolve(context, {old_password, password}, { user }) {
        // check if authenticated
        if( !user ) return null

        // check if user exists 
        let staff = await staff_model.findById(user._id).exec()

        // details were wrong
        if ( staff.$isEmpty() ) return null

        // check if passwords match
        let match = await bcrypt.compare(old_password, staff.password)

        // if passwords dont match return
        if ( !match ) return null

        const new_password = bcrypt.hash(password, 10)
        await staff_model.findByIdAndUpdate(user._id, { password: new_password })

        return {
            ...staff.toObject(),
        }
    }
}




// delete staff
const delete_staff = {
    type: staff_type,
    async resolve(_context, _args, { user }) {
        // check if authenticated
        if( !user ) return null

        // delete user
        let staff = await staff_model.findByIdAndDelete(user._id)

        return {
            ...staff.toObject(),
        }
    }
}



// 




module.exports = {
    add_staff,
    login_staff,
    update_staff_profile,
    update_staff_password,
    delete_staff
}