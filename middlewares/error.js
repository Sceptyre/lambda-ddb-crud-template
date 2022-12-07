module.exports = async function(err, req, res, next) {
    console.log(err)

    let errorResponse = {
        message: err.message
    }

    res.status(err?.code || 500).json(errorResponse)
}