const APIError = require('./APIError')

const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient()

module.exports = class {
    constructor(tableName, primaryKey = "id", objectSchema = {}) {
        this.TABLE_NAME = tableName
        this.PRIMARY_KEY = primaryKey
        this.OBJECT_SCHEMA = {
            [ primaryKey ]: String(),
            ...objectSchema // Apply defined objectSchema and enforce defined primary key
        }
    }


    // Data validators
    #validateID(id) {
        return typeof id == typeof this.OBJECT_SCHEMA[this.PRIMARY_KEY]
    }

    #validateKeys(data) {
        return Object.keys(data) == Object.keys(this.OBJECT_SCHEMA)
    }

    #validateValues(data) {
        for (k in Object.keys(data)) {
            if (typeof data[k] != typeof this.objectSchema[k]) {
                return false
            }
        }
    }

    ValidateData(data) {
        return typeof data instanceof Object && this.#validateKeys(data) && this.#validateValues(data)
    }


    // CRUD operations
    async Get(filter) {
        let i = await ddb.scan({
            TableName: this.TABLE_NAME,
            FilterExpression: filter
        }).promise()

        return i.Items
    }

    async GetById(id) {
        if (!this.#validateID(id)) { throw new APIError(`Invalid resource id value: ${id}.`, 400) }

        let i = await ddb.get({
            TableName: this.TABLE_NAME,
            Key: { [this.PRIMARY_KEY] : id }
        }).promise()

        if (!i.Item) { throw new APIError(`Resource id: ${id} not found.`, 404) }

        return i.Item
    }

    async Create(data) {        
        if (!this.ValidateData(data)) { throw new APIError("Request body is invalid.", 400) }

        let i = await ddb.put({
            TableName: this.TABLE_NAME,
            Item: data
        }).promise()

        return i.Item
    }

    async Update(id, data) {
        if (!this.#validateID(id)) { throw new APIError(`Invalid resource id value: ${id}.`, 400) }
        if (!this.ValidateData(data)) { throw new APIError("Request body is invalid.", 400) }

        let i = await ddb.update({
            TableName: this.TABLE_NAME,
            Key: { [this.PRIMARY_KEY] : id },
            Item: data
        }).promise()

        return i.Item
    }

    async Delete(id) {
        if (!this.#validateID(id)) { throw new APIError(`Invalid resource id value: ${id}.`, 400) }

        let i = await ddb.delete({
            TableName: this.TABLE_NAME,
            Key: { [this.PRIMARY_KEY] : id }
        }).promise()

        return i
    }
}