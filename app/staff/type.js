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



const StaffType = new GraphQLObjectType({
    name: 'StaffType',
    description: 'Staff Type',
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
        priviledge: {
            type: GraphQLString
        },
        is_active: {
            type: GraphQLBoolean
        },
        added_on: {
            type: GraphQLInt,
        },
    })
})

module.exports = StaffType