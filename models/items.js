const AWS = require("aws-sdk")
const ddb = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = process.env.TABLE_NAME || "ITEMS_TABLE"

module.exports = {
    async Get(filter) {
        let i = await ddb.scan({
            TableName: TABLE_NAME,
            FilterExpression: filter
        }).promise()

        return i.Items
    },
    async GetById(id) {
        let i = await ddb.get({
            TableName: TABLE_NAME,
            Key: { id }
        }).promise()

        return i.Item
    },
    async Create(data) {
        let i = await ddb.put({
            TableName: TABLE_NAME,
            Item: data
        }).promise()

        return i.Item
    },
    async Update(id, data) {
        let i = await ddb.update({
            TableName: TABLE_NAME,
            Key: { id },
            Item: data
        }).promise()

        return i.Item
    },
    async Delete(id) {
        let i = await ddb.delete({
            TableName: TABLE_NAME,
            Key: { id }
        }).promise()

        return i
    }
}