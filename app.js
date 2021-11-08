const express = require('express')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const passport = require('passport')
const passportLocal = require('passport-local')

const app = express()


app.get("/", (req, res) => {
    res.send("hello world")
})




app.listen(3000, function() {
    console.log("server statrted at 3000")
})

