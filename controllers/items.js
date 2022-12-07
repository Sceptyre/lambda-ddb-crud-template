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
            res.status(204).send(mItems.Put())
        } catch (err) { next(err) }
    },
    async Post(req, res, next) {
        try {
            res.status(204).send(mItems.Post())
        } catch (err) { next(err) }
    },
    async Delete(req, res, next) {
        try {
            res.status(204).send(mItems.Delete(req.params.id))
        } catch (err) { next(err) }
    }
}