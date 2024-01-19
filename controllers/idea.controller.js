const Idea = require('../models/Idea');
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");




// Get all ideas
const getIdeas = async (req, res) => {
    try {
        const ideas = await Idea.find().sort({ createdAt: -1 }).populate('user_id').populate('tag_id');
          res.status(200).json(ideas);
      
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get ideas by UserID
const getIdeasByUserID = async (req, res) => {
    try {
        const userID = req.params.id;
        const ideas = await Idea.find({user_id:userID}).sort({ createdAt: -1 }).populate('user_id').populate('tag_id');
        

          res.status(200).json(ideas);
      
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const getIdeasByTagId = async (req, res) => {
  try {
      const tagId = req.params.tagId;
      const ideas = await Idea.find({tag_id:tagId}).sort({ createdAt: -1 }).populate('user_id').populate('tag_id');
        res.status(200).json(ideas);
    
     
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};



// Get one idea
const getOneIdea = async (req, res) => {};

// Create new idea
const createIdea = async (req, res) => {}

// Update idea
const updateIdea = async (req, res) => {};

// Delete idea by ID
const deleteIdea = async (req, res) => {};

// Get Most Popular Ideas
const getMostPopularIdeas = async (req, res) => {
    try {
        // Lấy tất cả các Idea từ database và populate user_id để lấy thông tin của User Model
        const ideas = await Idea.find().populate('user_id');
    
        // Sắp xếp mảng ideasWithScores theo điểm giảm dần
        ideas.sort((a, b) => (b.like - b.dislike) - (a.like - a.dislike));
    
        // Giới hạn danh sách ideasWithScores thành 6 phần tử
        const mostPopularIdeas = ideas.slice(0, 6);
    
        // Trả về danh sách 6 Idea phổ biến nhất kèm theo thông tin user_name
        res.status(200).json(mostPopularIdeas);
      } catch (error) {
        // Xử lý lỗi nếu có
        res.status(500).json({ error: 'Error' });
      }

};



// Get Most Viewed Ideas
const getMostViewIdeas = async (req, res) => {
    try {
        const ideas = await Idea.find().populate('user_id'); 
       
        console.log(ideas)

        ideas.sort((a, b) => b.view_time - a.view_time);

        const mostViewIdeas = ideas.slice(0, 6);

        res.status(200).json(mostViewIdeas);
      } catch (error) {
       
        res.status(500).json({ error: 'Error' });
      }
  };

// Get Latest Ideas
const getLastestIdeas = async (req, res) => {
    try {
        
        const ideas = await Idea.find().sort({ createdAt: -1 }).limit(6).populate('user_id');
    
        res.status(200).json(ideas);
      } catch (error) {
        // Xử lý lỗi nếu có
        res.status(500).json({ error: 'Error' });
      }
};


module.exports={
    getIdeas: getIdeas,
    getOneIdea: getOneIdea,
    createIdea: createIdea,
    updateIdea: updateIdea,
    deleteIdea: deleteIdea,
    getMostPopularIdeas: getMostPopularIdeas,
    getMostViewIdeas: getMostViewIdeas,
    getLastestIdeas: getLastestIdeas,
    getIdeasByUserID: getIdeasByUserID,
    getIdeasByTagId: getIdeasByTagId
}