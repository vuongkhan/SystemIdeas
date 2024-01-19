const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const middleware=require('./../helpers/middleware');

router.post('/:ideaId', notificationController.createNotification);

router.get('/:userId', notificationController.getNotifications);

module.exports = router;