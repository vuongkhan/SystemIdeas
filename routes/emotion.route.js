const express = require('express');
const router = express.Router();
const emotioncontroller = require('../controllers/emotion.controller');
const middleware=require('./../helpers/middleware');

router.get('/:ideaId', emotioncontroller.getEmotionByUserIdIdeaId);
router.post('/:ideaId', emotioncontroller.updateEmotionAndIdea);
router.delete('/:ideaId', emotioncontroller.deleteEmotionByUserIdIdeaId);

module.exports = router;