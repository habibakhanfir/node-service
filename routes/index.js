var express = require('express');
const mongoose = require("mongoose");
var router = express.Router();

const auth = require('../middleware/auth');

var notifController= require('../controllers/NotificationController');
var postController= require('../controllers/PostsController');
var userController= require('../controllers/UsersController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/*
    Notif routes
*/

// Create a new Note
router.get('/notifcreate', notifController.create_notification);

// Retrieve all Notes
router.get('/notifget',auth, notifController.get_notifications);


/*
    Post routes
*/

// Creation Form
router.get('/createform',auth, postController.create_post_form);
//Create posts
router.post('/createpost',auth, postController.create_post);

// Posts list
router.get('/postlist',auth, postController.posts_list);

// delete
router.get('/deletepost/:id',auth, postController.delete_post);


// Update Form
router.get('/updateform/:id',auth, postController.update_post_form);
// update controller
router.post('/updatepost',auth, postController.update_post);

// like
router.post('/likepost/:id',auth, postController.like_post);
//unlike
router.post('/unlikepost/:id',auth, postController.unlike_post);

/*
    Users routes
*/


// signin
router.post('/signin', userController.sign_in);

// signup
router.post('/signup', userController.sign_up);

// signout
router.get('/signout', userController.sign_out);

module.exports = router;
