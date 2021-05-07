module.exports = (req, res, next) => {
    try {
        if(req.cookies.accessToken){
            next();
        } else {
            res.redirect('/');
        }
    } catch(error) {
        res.render('error', {
            error_message:error.message,
            error_status:500
        });
    }
};