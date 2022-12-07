const mItems = require("../models/items")

module.exports = {
    async Get(req, res, next) {
        var u

        try {
            u = req.params.id ? // if
                await mItems.GetById(req.params.id): // else
                await mItems.Get(req.params.filter)

            if (u) {
                res.status(200).json(u)
            } else {
                res.status(404).json()
            }

        } catch (err) { next(err) }
    },
    async Put(req, res, next) {
        try {
            res.status(200).json(await mItems.Update(req.params.id, req.body))
        } catch (err) { next(err) }
    },
    async Post(req, res, next) {
        console.log(req.body)
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