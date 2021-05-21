const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')



// app
const app = express()

// get env variables
dotenv.config()

// enable json processing
app.use(express.json())

// allow cross origin requests
app.use(cors())


// routes


app.get('/', (_req, res)=> {
    res.json({
        page: 'index',
        message: 'K11 running'
    })
})



const PORT = process.env.PORT || 4444

// start server
app.listen(PORT, ()=> {
    console.log(`started K11 at port ${PORT}`)
})