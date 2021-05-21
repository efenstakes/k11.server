const {
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLID,
}  = require('graphql')


// import models here




const VerifiedType = new GraphQLObjectType({
    name: 'User Verified Status',
    fields: ()=> ({
        code: { 
            type: GraphQLString,
        },
        issued_at: {
            type: GraphQLID,
        },
        done: {
            type: GraphQLBoolean,
        }
    })
})

const AccountType = new GraphQLObjectType({
    name: 'AccountType',
    description: 'Account Type',
    fields: ()=> ({
        _id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        phone: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        joined_on: {
            type: GraphQLID,
        },
        verified: {
            type: VerifiedType,
        },
        // tests: {
        //     type: GraphQLList(require('../tests/type')),
        //     resolve(context, args) {
        //         console.log('context ', context)
        //         console.log('args ', args)

        //         return []
        //     }
        // },
        // locations: {
        //     type: GraphQLList(require('../locations/type')),
        //     resolve(context, args) {
        //         console.log('context ', context)
        //         console.log('args ', args)

        //         return []
        //     }
        // },
        // vaccinations: {
        //     type: GraphQLList(require('../vaccinations/type')),
        //     resolve(context, args) {
        //         console.log('context ', context)
        //         console.log('args ', args)

        //         return []
        //     }
        // },
    })
})

module.exports = AccountType