module.exports = {

    checkAuthenticated : (failureRedirect) => {
        return (req, res, next) => {

            if(req.isAuthenticated() || req.session?.isAuthenticated){
                return next();
            }
            
            return res.redirect(failureRedirect);
        }
    },
    
    checkNotAuthenticated : (failureRedirect) => {
        return (req, res, next) => {
            if(req.isUnauthenticated()){
                return next();
            }

            return res.redirect(failureRedirect);
        }
    },

    checkAdminNotAuthenticated : (failureRedirect) => {
        return (req, res, next) => {
            if(!req.session.isAuthenticated){
                return next();
            }

            return res.redirect(failureRedirect);
        }
    },

    checkIsAutheticatedAndAdmin : (failureRedirect) => {
        return (req, res, next) => {
            
            if((req.isAuthenticated() || req.session.isAuthenticated) && req.session?.isAdmin){
                return next();
            }
            return res.redirect(failureRedirect);
        }
    },

    checkIsAdmin : (redirectUrl) => {
        return (req, res, next) => {
            if(req.session?.isAdmin){
                return res.redirect(redirectUrl);
            }
            return next();
        }
    },

    checkIsAutheticatedAndUser : (redirectUrl) => {
        return (req, res, next) => {
            const isAdmin = req.session?.isAdmin ? true : false;
            
            if((req.isAuthenticated() || req.session.isAuthenticated) && isAdmin == false){
                return res.redirect(redirectUrl);
            }
            return next();
        }
    },
}