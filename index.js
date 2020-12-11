// modules
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

// variables
const dbLink = process.env.DB_LINK
const port = process.env.DB_PORT
const userRoute = require('./src/routes/userRoute')

// database connection
mongoose.connect(dbLink, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, () => {
    app.listen(port, () => {
        console.info(`DATABASE CONNECTED ON PORT ${port}`)
    })
}, (error) => {
    console.log(dbLink, port)
})

// middlewares: a normal javascript function that has access to the request and response object and can modify it
app.use(express.json())
app.use(express.static("build"))     // Sets up a static server

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'build', 'index.html'))
})

// routes
app.use(userRoute)