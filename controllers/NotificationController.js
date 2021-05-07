var Notification = require('../models/Notification');

exports.create_notification=function (req, res) {
    // Create a Notification
    const notification = new Notification({
        user_id: '0001',
        post_id: '1000'
    });

    // Save Notification in the database
    notification.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Notification."
        });
    });
}



// Find notification list by userId
exports.get_notifications = function(req, res){
    let criteria ={}

    let user_id = req.query.user_id;
    let post_id = req.query.post_id;

    if (user_id){
        criteria.user_id = user_id;
    }

    if (post_id){
        criteria.post_id = post_id;
    }

    Notification.find(criteria, function(err, notifications) {
        res.render('notifications_list', {
            notifications: notifications,
        });
    });
};

