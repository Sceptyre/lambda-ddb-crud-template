const mItems = require("../models/items")

module.exports = {
    async Get(req, res) {
        var u

        try {
            if (req.params.id) {
                u = await mItems.GetById(req.params.id)
            } else {
                u = await mItems.Get(req.params.filter)
            }

            if (u) {
                res.status(200).json(i)
            } else {
                res.status(404).send()
            }

        } catch {
            res.status(500).send(
                
            )
        }
    },
    async Put(req, res) {
        try {
            res.status(204).send(mItems.Put())
        } catch {
            res.status(500).send(
                
            )
        }
    },
    async Post(req, res) {
        try {
            res.status(204).send(mItems.Post())
        } catch {
            res.status(500).send(
                
            )
        }
    },
    async Delete(req, res) {
        try {
            res.status(204).send(mItems.Delete(req.params.id))
        } catch {
            res.status(500).send(
                
            )
        }
    }
}