module.exports = {

    checkAuthenticated : (redirectUrl) => {
        return (req, res, next) => {
            if(!req.isAuthenticated()){
                return res.redirect(redirectUrl);
            }

            next();
        }
    },
    
    checkNotAuthenticated : (redirectUrl) => {
        return (req, res, next) => {
            if(!req.isUnauthenticated()){
                return res.redirect(redirectUrl);
            }
            next();
        }
    },
}