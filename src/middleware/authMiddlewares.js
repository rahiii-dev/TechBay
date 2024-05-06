module.exports = {

    isAuthenticated : (redirectUrl) => {
        return (req, res, next) => {
            if(!req.isAuthenticated()){
                return res.redirect(redirectUrl);
            }

            next();
        }
    },
    
    isNotAuthenticated : (redirectUrl) => {
        return (req, res, next) => {
            if(!req.isUnauthenticated()){
                return res.redirect(redirectUrl);
            }
            next();
        }
    },
}