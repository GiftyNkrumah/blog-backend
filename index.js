// modules
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

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

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'build', 'index.html'))
})

// middlewares
const app = express()
app.use(express.json())

// routes
app.use(userRoute)