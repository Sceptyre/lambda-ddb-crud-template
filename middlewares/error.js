module.exports = async function(err, req, res, next) {
    let errorResponse = {
        message: err.message,
        code: err?.code
    }

    res.status(err?.code || 500).json(errorResponse)
}