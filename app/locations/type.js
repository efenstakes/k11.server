const {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLID,
}  = require('graphql')


// import models here
const user_model = require('../accounts/model')



const location_type = new GraphQLObjectType({
    name: 'LocationType',
    description: 'Location Type',
    fields: ()=> ({
        _id: {
            type: GraphQLID
        },
        user_id: {
            type: GraphQLID
        },
        lat: {
            type: GraphQLString
        },
        lng: {
            type: GraphQLString
        },
        country: {
            type: GraphQLString
        },
        city: {
            type: GraphQLString
        },
        added_on: {
            type: GraphQLInt
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

module.exports = location_type