module.exports = async function(req, res, next) {
    console.log({
        method: req.method,
        url: req.url,
        params: req.params,
        body: req.body
    });

    next()
}