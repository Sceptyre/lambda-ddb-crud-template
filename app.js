const mwBodyParser = require('body-parser')

const mwError = require("./middlewares/error" )
const mwLogger = require("./middlewares/logger")

const express = require("express")
const app = express();

// Body parser
app.use(mwBodyParser.json({type:['*/json']}));

// Logging
app.use(mwLogger)

// Root router
app.use('/api', require("./routers"))

// Error handling
app.use(mwError)


module.exports = app