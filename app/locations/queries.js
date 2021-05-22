const { GraphQLString, GraphQLList, GraphQLBoolean } = require('graphql')


const location_type = require('./type')
const location_model = require('./model')



// add location
const add_location = {
    type: location_type,
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

        const location = await new location_model({
            ...args, staff_id: user._id
        }).save()

        return {
            ...location,
        }
    }
}


// get user locations
const get_user_locations = {
    type: GraphQLList(location_type),
    args: {},
    async resolve(_context, args, { user }) {
        // check if the one adding is authed
        if( !user ) return null

        const locations = await new location_model.find({ 
                            user_id: user._id
                        })

        return locations
    }
}



// get station locations
const get_station_locations = {
    type: GraphQLList(location_type),
    args: {
        station: {
            type: GraphQLString,
        },
    },
    async resolve(_context, { station }, { user }) {
        // check if the one adding is authed
        if( !user || !user.priviledge ) return null

        const locations = await new location_model.find({ station })
        return locations
    }
}


// update location -- set if -ve/+ve 
const update_location = {
    type: location_type,
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
        let location = await location_model.findByIdAndUpdate(id, { ...args })

        // sth went wrong
        if ( !location || !location._id ) return null
 
        return {
            ...location
        }
    }
}





module.exports = {
    add_location,
    get_user_locations,
    get_station_locations,
    update_location,
}