const ModelFromDDB = require("../classes/ModelFromDDB")

itemSchema = {
    "id": "",
    "assigned_to": "",

}

module.exports =  new ModelFromDDB(process.env.TABLE_NAME, "id")