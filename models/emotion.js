const mongoose = require('mongoose');

const emotionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
      },
    idea_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Idea',
        required: true
      },
    isLike: {
        type: Boolean,
        default: true,
    }

}, { timestamps: true })

const Emotion = mongoose.model('Emotion', emotionSchema);
module.exports = Emotion;