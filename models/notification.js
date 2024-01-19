const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
      },

    other_user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
      },

    idea_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Idea',
        required: true
      },
  
    type: {
        type: String,
        enum: ['Comment', 'Post'],
        default: 'Comment',
        required: true
    },
  
}, { timestamps: true });


const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;