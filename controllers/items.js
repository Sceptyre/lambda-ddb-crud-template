const mItems = require("../models/items")

module.exports = {
    async GetId(req, res, next) {
        try {            
            res.status(200).json(await mItems.GetById(req.params.id))
        } catch (err) { next(err) }
    },
    async Get(req, res, next) {
        try {
            res.status(200).json(await mItems.Get(req.params.filter))
        } catch (err) { next(err) }
    },
    async Put(req, res, next) {
        try {
            res.status(200).json(await mItems.Update(req.params.id, req.body))
        } catch (err) { next(err) }
    },
    async Post(req, res, next) {
        try {
            res.status(201).json(await mItems.Create(req.body))
        } catch (err) { next(err) }
    },
    async Delete(req, res, next) {
        try {
            res.status(204).json(await mItems.Delete(req.params.id))
        } catch (err) { next(err) }
    }
}