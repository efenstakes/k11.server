// include external libraries
const Mongoose = require('mongoose')

// allow `findOneAndUpdate()` and `findOneAndDelete()` to work
Mongoose.set('useFindAndModify', false)

// function to connect to mongo
const connect = async () => {
    let connection

    try { // klmgo-db
        connection = await Mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
        console.log('connected to db')
    } catch (e) {
        console.log('error connecting to db ', e)
    }

    return connection
}// const connect = () => { .. }

// all the connect function to get connection
const connection = connect()

// export the db connection
module.exports = connection