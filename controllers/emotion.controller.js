const Emotion = require('../models/Emotion');
const Idea = require('../models/Idea');

const getEmotionByUserIdIdeaId = async (req, res) => {
    try {
        const ideaId = req.params.ideaId;
        const userId = req.query.userId;
        const findEmotion = await Emotion
                .findOne({user_id: userId, idea_id: ideaId})
                .populate('user_id', 'fullname')
                .populate('idea_id', 'title');
        res.json(findEmotion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const updateEmotionAndIdea = async (req, res) => {
    try {
        const ideaId = req.params.ideaId;
        const userId = req.body.userId;
        const isEmotion = req.body.isEmotion;

        console.log("update idea id pass: " + ideaId+" , user id: " + userId);

      let emotion = await Emotion.findOne({ user_id: userId, idea_id: ideaId });
   
      
      if (!emotion) {
        emotion = new Emotion({
          user_id: userId,
          idea_id: ideaId,
          isLike: isEmotion
        });
      } else {
        emotion.isLike = isEmotion;
      }
      
      await emotion.save();
      
      const idea = await Idea.findOne({ _id: ideaId });

      const totalLikes = await Emotion.countDocuments({ idea_id: ideaId, isLike: true });
      const totalDislikes = await Emotion.countDocuments({ idea_id: ideaId, isLike: false });

      idea.like = totalLikes;
      idea.dislike = totalDislikes;
      
      await idea.save();
      
      return res.json({
            like: totalLikes,
            dislike: totalDislikes
    });	
    } catch (error) {
      return { success: false, message: 'Failed to update emotion and idea' };
    }
  };

const deleteEmotionByUserIdIdeaId = async (req, res) => {
        const ideaId = req.params.ideaId;
        const userId = req.query.userId;

        console.log("idea id pass: "+ideaId+" , user id pass: "+userId);

        Emotion.findOne({idea_id:ideaId, user_id: userId}).then(async (emo)=>{
            if(!emo){
                return res.status(400).send({
                    message:'No emotion found',
                    data:{}
                });	
            }else{
                    try{
                        await Emotion.deleteOne({_id:emo._id});

                        const idea = await Idea.findOne({ _id: ideaId });

                        const totalLikes = await Emotion.countDocuments({ idea_id: ideaId, isLike: true });
                        const totalDislikes = await Emotion.countDocuments({ idea_id: ideaId, isLike: false });

                        idea.like = totalLikes;
                        idea.dislike = totalDislikes;
                        
                        await idea.save();
                        return res.json({
                            like: totalLikes,
                            dislike: totalDislikes
                        });
                    }catch(err){
                        return res.status(400).send({
                              message:err.message,
                              data:err
                          });
                    }
                // }
            }
        }).catch((err)=>{
            return res.status(400).send({
                  message:err.message,
                  data:err
              });
        });
};

module.exports = {
    getEmotionByUserIdIdeaId: getEmotionByUserIdIdeaId,
    updateEmotionAndIdea: updateEmotionAndIdea,
    deleteEmotionByUserIdIdeaId: deleteEmotionByUserIdIdeaId
}