const ModelFromDDB = require("../classes/ModelFromDDB")

itemPrimaryKey = "id"

itemSchema = {
    "id"            : String(),
    "assigned_to"   : String()
}

module.exports =  new ModelFromDDB(process.env.TABLE_NAME, itemPrimaryKey, itemSchema)