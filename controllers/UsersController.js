var rabbitmq = require('../modules/queue');

exports.sign_in = function (req, res) {
    rabbitmq.send_sync('laravel', {
        route: "/api/user/login",
        method: "POST",
        headers:{
            Accept: "application/json",
        },
        query: null,
        body: {
            email:req.body.email,
            password:req.body.password
        }
    }, function (result,error) {
        if (error) {
            res.render('error', {
                error_message: error.message,
                error_status: error.status
            });
        }
        res.cookie('accessToken', result.token);
        res.redirect('/notifget');
    });
}

exports.sign_up = function (req, res) {
    rabbitmq.send_sync('laravel', {
        route: "/api/user/register",
        method: "POST",
        headers:{
            Accept: "application/json",
        },
        query: null,
        body: {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }
    }, function (result,error) {
        if (error) {
            res.render('error', {
                error_message: error.message,
                error_status: error.status
            });
        }
        res.cookie('accessToken', result.token);
        res.redirect('/postlist');
    });
}

exports.sign_out = function (req, res) {
    res.clearCookie('accessToken');
    res.redirect('/');
}