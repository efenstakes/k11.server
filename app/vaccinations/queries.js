const { GraphQLString, GraphQLList, GraphQLBoolean } = require('graphql')


const vaccination_type = require('./type')
const vaccination_model = require('./model')



// add vaccination
const add_vaccination = {
    type: vaccination_type,
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
    resolve(_context, args, { user }) {
        // check if the one adding is authed
        if( !user || !user.priviledge ) return null

        const vaccination = await new vaccination_model({
            ...args, staff_id: user._id
        }).save()

        return {
            ...vaccination,
        }
    }
}


// get user vaccinations
const get_user_vaccinations = {
    type: GraphQLList(vaccination_type),
    args: {},
    resolve(_context, args, { user }) {
        // check if the one adding is authed
        if( !user ) return null

        const vaccinations = await new vaccination_model.find({ 
                            user_id: user._id
                        })

        return vaccinations
    }
}



// get station vaccinations
const get_station_vaccinations = {
    type: GraphQLList(vaccination_type),
    args: {
        station: {
            type: GraphQLString,
        },
    },
    resolve(_context, { station }, { user }) {
        // check if the one adding is authed
        if( !user || !user.priviledge ) return null

        const vaccinations = await new vaccination_model.find({ station })
        return vaccinations
    }
}


// update vaccination -- set if -ve/+ve 
const update_vaccination = {
    type: account_type,
    args: {
        id: {
            type: GraphQLString,
        },
        is_negative: {
            type: GraphQLBoolean,
        },
    },
    resolve(context, args, { user }) {
        // check if authenticated
        if( !user || !user.priviledge ) return null

        // check if user exists 
        let vaccination = await vaccination_model.findByIdAndUpdate(id, { ...args })

        // sth went wrong
        if ( vaccination.$isEmpty() ) return null
 
        return {
            ...vaccination.toObject()
        }
    }
}





module.exports = {
    add_vaccination,
    get_user_vaccinations,
    get_station_vaccinations,
    update_vaccination,
}