const express = require("express")
const r = express.Router()
const cItems = require("../controllers/items")

r.get('/:id', cItems.GetId)
r.get('/', cItems.Get)
r.put('/:id', cItems.Put)
r.post('/', cItems.Post)
r.delete('/:id', cItems.Delete)

module.exports = r