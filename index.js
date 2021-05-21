const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { graphqlHTTP } = require('express-graphql')


// app imports
const schema = require('./app/schema')
const { authenticate, authenticate_staff } = require('./app/utils/auth')


// app
const app = express()

// get env variables
dotenv.config()

// get database connection 
require('./app/utils/database')


// enable json processing
app.use(express.json())

// allow cross origin requests
app.use(cors())



// get auth status first
app.use(authenticate)
app.use(authenticate_staff)


// routes

app.get('/', (_req, res)=> {
    res.json({
        page: 'index',
        message: 'K11 running'
    })
})

// setup graphql
app.use(
    '/api',
    graphqlHTTP({
        schema,
        graphiql: true,
    })
)


const PORT = process.env.PORT || 4444

// start server
app.listen(PORT, ()=> {
    console.log(`started K11 at port ${PORT}`)
})