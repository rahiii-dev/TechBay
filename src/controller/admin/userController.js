const User = require('../../model/userModel');

module.exports = {
    /*  
        Route: GET admin/user
        Purpose: Render the UserListPage
    */
    renderUserListPage : async (req, res, next) => {
        try {     
            const users = await User.find().select('name mobile_no email googleId facebookId isBlocked');
            return res.render('admin/user/userList', {title : "Tech Bay | Admin | Users", users});
        } catch (error) {
            console.log("Error while rendering user list Page");
            next(error)
        }
    },
    /*  
        Route: PATCH admin/block/:user_id
        Purpose: block a user
    */
    blockUser : async (req, res, next) => {
        try {
            await User.findByIdAndUpdate(req.params.user_id, { isBlocked : true});
            return res.redirect('/admin/user/list');
        } catch (error) {
            console.log("Error while blocking user");
            next(error)
        }
    },
    /*  
        Route: PATCH admin/unblock/:user_id
        Purpose: block a user
    */
    unBlockUser : async (req, res, next) => {
        try {
            await User.findByIdAndUpdate(req.params.user_id, { isBlocked : false});
            return res.redirect('/admin/user/list');
        } catch (error) {
            console.log("Error while Unblocking user");
            next(error)
        }
    },
}