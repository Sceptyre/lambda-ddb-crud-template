const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient()

module.exports = class {
    constructor(tableName, primaryKey = "id", objectSchema = {}) {
        this.TABLE_NAME = tableName
        this.PRIMARY_KEY = primaryKey
        this.OBJECT_SCHEMA = objectSchema
    }

    static #validateKeys(data) {
        return Object.keys(data) == Object.keys(this.OBJECT_SCHEMA)
    }

    static #validateValues(data) {
        for (k in Object.keys(data)) {
            if (typeof data[k] != typeof this.objectSchema[k]) {
                return false
            }
        }
    }

    static ValidateData(data) {
        return typeof data == typeof Object() && this.#validateKeys(data) && this.#validateValues(data)
    }

    static async Get(filter) {
        let i = await ddb.scan({
            TableName: TABLE_NAME,
            FilterExpression: filter
        }).promise()

        return i.Items
    }

    static async GetById(id) {
        let i = await ddb.get({
            TableName: TABLE_NAME,
            Key: { [this.PRIMARY_KEY] : id }
        }).promise()

        if (!i.Item) {
            return new Error(`Id ${id} not found`)
        }

        return i.Item
    }

    static async Create(data) {        
        if (!this.ValidateData(data)) { return new Error("Submitted Data Is Invalid") }

        let i = await ddb.put({
            TableName: TABLE_NAME,
            Item: data
        }).promise()

        return i.Item
    }

    static async Update(id, data) {
        if (!this.ValidateData(data)) { return new Error("Submitted Data Is Invalid") }

        let i = await ddb.update({
            TableName: TABLE_NAME,
            Key: { [this.PRIMARY_KEY] : id },
            Item: data
        }).promise()

        return i.Item
    }

    static async Delete(id) {
        let i = await ddb.delete({
            TableName: TABLE_NAME,
            Key: { [this.PRIMARY_KEY] : id }
        }).promise()

        return i
    }
}