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



const TestType = new GraphQLObjectType({
    name: 'TestType',
    description: 'Test Type',
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
        made_on: {
            type: GraphQLInt
        },
        is_negative: {
            type: GraphQLBoolean,
        },
        station: {
            type: GraphQLString
        },
        symptoms: {
            type: GraphQLList(GraphQLString),
        },
        user: {
            type: GraphQLList(require('../accounts/type')),
            resolve(context, args) {
                console.log('context ', context)
                console.log('args ', args)

                return user_model.findById(context.user_id)
            }
        },
    })
})

module.exports = TestType