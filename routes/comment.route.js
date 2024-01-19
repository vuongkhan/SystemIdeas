const express = require('express');
const router = express.Router();
const commentcontroller = require('../controllers/comment.controller');
const middleware=require('./../helpers/middleware');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploadDatas/');
    },
    
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  // Tạo instance của multer
  const upload = multer({ storage: storage });


// GET /tags
router.get('/:idea_id', commentcontroller.getComment);
//Create comment
router.post('/:idea_id', upload.none(), commentcontroller.createComment);
//Delete comment
router.delete('/:comment_id', commentcontroller.deleteComment);

//Edit Comment
router.put('/:comment_id/', commentcontroller.updateComment);
module.exports = router;