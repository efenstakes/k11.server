const { GraphQLString } = require('graphql')
const bcrypt = require('bcrypt')


const account_type = require('./type')
const account_model = require('./model')
const { generate_access_token, generate_refresh_token } = require('../utils/auth')


// create account
const create_account = {
    type: account_type,
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
    },
    async resolve(context, args) {
        const new_account = await new account_model(args).save()

        const access_token = generate_access_token(new_account)
        const refresh_token = generate_refresh_token(new_account)

        console.log('new_account ', new_account.toObject())

        // return {
        //     ...new_account,
        // }
        return {
            ...new_account.toObject(),
            access_token,
            refresh_token,
        }
    }
}


// login
const login = {
    type: account_type,
    args: {
        email: {
            type: GraphQLString,
        },
        password: {
            type: GraphQLString,
        },
    },
    async resolve(_context, {email, password}) {
        // check if user exists 
        let account = await account_model.findOne({ email: email })

        // details were wrong
        if ( account.$isEmpty() ) return new Error('Wrong Details')

        // check if passwords match
        let match = await bcrypt.compare(password, account.password)

        // if passwords dont match return
        if ( !match ) return new Error('Wrong Details P')

        const access_token = generate_access_token(account)
        const refresh_token = generate_refresh_token(account)
        
        return {
            ...account.toObject(),
            access_token,
            refresh_token,
        }
    }
}


// update profile
const update_profile = {
    type: account_type,
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
    },
    async resolve(context, args, { user }) {
        // check if authenticated
        if( !user ) return null

        // check if user exists 
        let account = await account_model.findByIdAndUpdate(user._id, { ...args })

        // sth went wrong
        if ( account.$isEmpty() ) return null
 
        return {
            ...account.toObject()
        }
    }
}



// update password
const update_password = {
    type: account_type,
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
        let account = await account_model.findById(user._id).exec()

        // details were wrong
        if ( account.$isEmpty() ) return null

        // check if passwords match
        let match = await bcrypt.compare(old_password, account.password)

        // if passwords dont match return
        if ( !match ) return null

        const new_password = bcrypt.hash(password, 10)
        await account_model.findByIdAndUpdate(user._id, { password: new_password })

        return {
            ...account.toObject(),
        }
    }
}



// delete account
const delete_account = {
    type: account_type,
    async resolve(_context, _args, { user }) {
        // check if authenticated
        if( !user ) return null

        // delete user
        let account = await account_model.findByIdAndDelete(user._id)

        return {
            ...account,
        }
    }
}



module.exports = {
    create_account,
    login,
    update_profile,
    update_password,
    delete_account,
}