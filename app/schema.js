const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
} = require('graphql')


// accounts
const {
    create_account, login, update_profile, update_password,
    delete_account
} = require('./accounts/queries')

// staff 
const {
    add_staff, update_staff_profile, update_staff_password,
    delete_staff, login_staff,
} = require('./staff/queries')




const root_mutation = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'Root Mutation description',
    fields: ()=> ({
        
        // accounts
        create_account,
        update_profile, 
        update_password,
        delete_account,


        // staff
        add_staff, 
        update_staff_profile, 
        update_staff_password,    
        delete_staff, 

        // tests


        // locations


        // vaccinations

    })
})

const root_query = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'RootQuery description',
    fields: {

        test: {
            type: new GraphQLObjectType({
                name: 'testtaipu',
                fields: {
                    what: { type: GraphQLString },
                    message: { type: GraphQLString },
                },
            }),
            resolve(_context, _args) {
                return {
                    what: 'graphql',
                    message: 'working'
                }
            }
        },

        // accounts
        login,


        // staff
        login_staff,


        // tests


        // locations


        // vaccinations


    }
})


const schema = new GraphQLSchema({
    query: root_query,
    mutation: root_mutation,
})


module.exports = schema