const express = require("express")
const r = express.Router()
const rItems = require("./items")

r.use('/items', rItems)

module.exports = r