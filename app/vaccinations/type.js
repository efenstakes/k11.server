const {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLID,
}  = require('graphql')


// import models here
const user_model = require('../accounts/model')
const staff_model = require('../staff/model')



const vaccination_type = new GraphQLObjectType({
    name: 'VaccinationType',
    description: 'Vaccination Type',
    fields: ()=> ({
        _id: {
            type: GraphQLID
        },
        user_id: {
            type: GraphQLID
        },
        staff_id: {
            type: GraphQLID
        },
        done_on: {
            type: GraphQLInt
        },
        station: {
            type: GraphQLString
        },
        user: {
            type: GraphQLList(require('../accounts/type')),
            resolve(context, args) {
                console.log('context ', context)
                console.log('args ', args)

                return user_model.findById(context.user_id)
            }
        },
        staff: {
            type: GraphQLList(require('../staff/type')),
            resolve(context, args) {
                console.log('context ', context)
                console.log('args ', args)

                return staff_model.findById(context.user_id)
            }
        },
    })
})

module.exports = vaccination_type