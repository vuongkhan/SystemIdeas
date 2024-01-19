const mongoose = require('mongoose');

let Tag;
try {
  Tag = mongoose.models('Tag');
} catch (e) {
  const tagSchema = new mongoose.Schema({
    subject: {
      type: String,
      required: false,
      trim: true
    },
    description: {
      type: String,
      required: false,
      trim: true
    },
    start_dateOfTag: {
      type: Date,
      required: false,
    },
    end_dateOfTag: {
      type: Date,
      required: false,
    },
    end_dateOfIdea: {
      type: Date,
      required: false,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
  }, { timestamps: true });
  
  Tag = mongoose.model('Tag', tagSchema);
}



module.exports = Tag;