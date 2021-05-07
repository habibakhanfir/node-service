let mongoose= require ('mongoose');

let NotificationSchema = mongoose.Schema({
    user_id:{
        type:String
    },
    post_id:{
        type:String
    }
},{ timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);