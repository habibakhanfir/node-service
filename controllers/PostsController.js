var rabbitmq = require('../modules/queue');

exports.posts_list = function (req, res) {
    rabbitmq.send_sync('laravel', {
        route: "/api/post",
        method: "GET",
        headers:{
            Accept: "application/json",
            Authorization: 'Bearer '+req.cookies.accessToken
        },
        query: null,
        body: null
    }, function (posts_list) {
        res.render('view_posts', {
            posts_list: posts_list
        });
    });
}

exports.like_post = function (req, res) {
    rabbitmq.send_sync('laravel', {
        route: "/api/likepost/"+req.params.id,
        method: "POST",
        headers:{
            Accept: "application/json",
            Authorization: 'Bearer '+req.cookies.accessToken,
        },
        query: null,
        body: null
    }, function (result,error) {
        if (error) {
            res.render('error', {
                error_message: error.message,
                error_status: error.status
            });
            return;
        }
        res.sendStatus(204);
    });
}

exports.unlike_post = function (req, res) {
    rabbitmq.send_sync('laravel', {
        route: "/api/unlikepost/"+req.params.id,
        method: "POST",
        headers:{
            Accept: "application/json",
            Authorization: 'Bearer '+req.cookies.accessToken,
        },
        query: null,
        body: null
    }, function (result,error) {
        if (error) {
            res.render('error', {
                error_message: error.message,
                error_status: error.status
            });
            return;
        }
        res.sendStatus(204);
    });
}

exports.create_post_form= function (req, res){
    res.render('create_form')
}

exports.create_post = function (req, res) {
    rabbitmq.send_sync('laravel', {
        route: "/api/post",
        method: "POST",
        headers:{
            Accept: "application/json",
            Authorization: 'Bearer '+req.cookies.accessToken,
        },
        query: null,
        body: {
            title:req.body.title,
            body:req.body.body
        }
    }, function (result,error) {
        if (error) {
            res.render('error', {
                error_message: error.message,
                error_status: error.status
            });
            return;
        }
        res.redirect('/postlist');
    });
}

exports.delete_post = function (req, res) {
    rabbitmq.send_sync('laravel', {
        route: "/api/post/"+req.params.id,
        method: "DELETE",
        headers:{
            Accept: "application/json",
            Authorization: 'Bearer '+req.cookies.accessToken,
        },
        query: null,
        body: null
    }, function (result,error) {
        if (error) {
            res.render('error', {
                error_message: error.message,
                error_status: error.status
            });
            return;
        }
        res.redirect('/postlist');
    });
}

exports.update_post_form= function (req, res){
    rabbitmq.send_sync('laravel', {
        route: "/api/post/"+req.params.id,
        method: "GET",
        headers: {
            Accept:"application/json",
            Authorization: "Bearer "+req.cookies.accessToken
        },
        query: null,
        body: null
    }, function (post) {
        res.render('update_form', {
            post_id: post._id,
            post_title:post.title,
            post_body: post.body
        });
    });
}

exports.update_post = function (req, res) {
    rabbitmq.send_sync('laravel', {
        route: "/api/post/"+req.body.post_id,
        method: "PUT",
        headers:{
            Accept: "application/json",
            Authorization: 'Bearer '+req.cookies.accessToken,
        },
        query: null,
        body: {
            title:req.body.title,
            body:req.body.body
        }
    }, function (result,error) {
        if (error) {
            res.render('error', {
                error_message: error.message,
                error_status: error.status
            });
            return;
        }
        res.redirect('/postlist');
    });
}

