const mwError = require("./middlewares/error" )
const mwLogger = require("./middlewares/logger")

const rRoot = require("./routers/root")

const express = require("express")
const app = express();

app.use(mwLogger)

app.use('/api', rRoot)

app.use(mwError)

module.exports = app