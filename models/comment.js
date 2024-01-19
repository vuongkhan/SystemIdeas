const mongoose = require('mongoose');

let Comment;
try {
  Comment = mongoose.model('Comment');
} catch (error) {
  const commentSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      trim: true
    },
    isAnonymity: {
      type: Boolean,
      default: false,
    },
    comment: {
      type: String,
      required: true,
    },
    idea_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Idea'
    }
  }, { timestamps: true });
  
  Comment = mongoose.model('Comment', commentSchema);
}


module.exports = Comment;