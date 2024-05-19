module.exports = (req, res, next) => {
    if (req.user && req.user.isBlocked) {
        req.logOut((err) => {
            if (err) {
                console.log("Error while Logging Out in isBlockMiddleware.");
                return next(err);
            }
            
            req.flash('warning-message', {message : "Your account has been blocked"});
            return res.redirect('/login');
        });
    } else {
        next();
    }
};
