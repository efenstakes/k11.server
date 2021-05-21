const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
} = require('graphql')



const root_query = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'RootQuery description',
    fields: ()=> ({

        test: {
            type: new GraphQLObjectType({
                name: 'testtaipu',
                fields: {
                    what: { type: GraphQLString },
                    message: { type: GraphQLString },
                },
            }),
            resolve(context, args) {
                return {
                    what: 'graphql',
                    message: 'working'
                }
            }
        },

        // accounts


        // staff


        // tests


        // locations


        // vaccinations


    })
})


const schema = new GraphQLSchema({
    query: root_query,
})


module.exports = schema