const { GraphQLString, GraphQLList, GraphQLBoolean } = require('graphql')


const test_type = require('./type')
const test_model = require('./model')



// add test
const add_test = {
    type: test_type,
    args: {
        name: {
            type: GraphQLString,
        },
        user_id: {
            type: GraphQLString,
        },
        is_negative: {
            type: GraphQLString,
        },
        station: {
            type: GraphQLString,
        },
        symptoms: {
            type: GraphQLList(GraphQLString)
        },
    },
    async resolve(_context, args, { user }) {
        // check if the one adding is authed
        if( !user || !user.priviledge ) return null

        const test = await new test_model({
            ...args, staff_id: user._id
        }).save()

        return {
            ...test.toObject(),
        }
    }
}


// get user tests
const get_user_tests = {
    type: GraphQLList(test_type),
    args: {},
    async resolve(_context, args, { user }) {
        // check if the one adding is authed
        if( !user ) return null

        const tests = await new test_model.find({ 
                            user_id: user._id
                        })

        return tests
    }
}



// get station tests
const get_station_tests = {
    type: GraphQLList(test_type),
    args: {
        station: {
            type: GraphQLString,
        },
    },
    async resolve(_context, { station }, { user }) {
        // check if the one adding is authed
        if( !user || !user.priviledge ) return null

        const tests = await new test_model.find({ station })
        return tests
    }
}


// update test -- set if -ve/+ve 
const update_test = {
    type: test_type,
    args: {
        id: {
            type: GraphQLString,
        },
        is_negative: {
            type: GraphQLBoolean,
        },
    },
    async resolve(context, args, { user }) {
        // check if authenticated
        if( !user || !user.priviledge ) return null

        // check if user exists 
        let test = await test_model.findByIdAndUpdate(id, { ...args })

        // sth went wrong
        if ( test.$isEmpty() ) return null
 
        return {
            ...test.toObject()
        }
    }
}





module.exports = {
    add_test,
    get_user_tests,
    get_station_tests,
    update_test,
}