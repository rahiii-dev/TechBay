module.exports = (layoutPath) => {
    return (req, res, next) => {
        res.locals.layout = layoutPath;
        next()
    }
}