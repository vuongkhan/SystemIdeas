const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag.controller');
const middleware=require('./../helpers/middleware');
// POST /tags
router.route('/')
.post(tagController.createTag)
// GET /tags
.get(tagController.getTags)
// GET /tag
router.route('/:id')
.get(tagController.getTag)
// GET /delete tag
.delete(tagController.deleteTag)
// GET /Edit tag
.put(tagController.updateTag)
module.exports = router;