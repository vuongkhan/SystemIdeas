const { default: mongoose } = require('mongoose');
const { Validator } = require('node-input-validator');
let Comment = require('../models/Comment');
const Idea = require('../models/Idea');
// Get all comments
const getComment = async (req, res) => {
    try {
		const ideaId = req.params.idea_id;
      const comments = await Comment
	  		.find({idea_id: ideaId})	
			.sort({ createdAt: -1 })
			.populate('user_id')
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
 // Create a new comment  
const createComment = async (req, res) => {
  let idea_id=req.params.idea_id;


	if(!mongoose.Types.ObjectId.isValid(idea_id)){
		return res.status(400).send({
	  		message:'Invalid idea id',
	  		data:{}
	  	});
	}
	Idea.findOne({_id:idea_id}).then(async (idea)=>{
		if(!idea){
			return res.status(400).send({
				message:'No idea found',
				data:{}
			});	
		}else{


			try{
				const v = new Validator(req.body, {
					comment:'required',
				});
				const matched = await v.check();
				if (!matched) {
					return res.status(422).send(v.errors);
				}

				let newCommentDocument= new Comment({
					comment:req.body.comment,
					isAnonymity: req.body.isAnonymous,
					idea_id:idea_id,
					user_id:req.body.user_id,
				});
				let commentData=await newCommentDocument.save();

				await Idea.updateOne(
					{_id:idea_id},
					{

						$push: { comment :commentData._id  } 
					}
				)
				return res.status(200).send({
					message:'Comment successfully added',
					data:commentData[0]
				});
			}catch(err){
				return res.status(400).send({
			  		message:err.message,
			  		data:err
			  	});
			}
		}
	}).catch((err)=>{
		return res.status(400).send({
	  		message:err.message,
	  		data:err
	  	});
	})
}  
  // Delete a comment by ID
const deleteComment =(req, res) => {
	let comment_id=req.params.comment_id;
	if(!mongoose.Types.ObjectId.isValid(comment_id)){
		return res.status(400).send({
	  		message:'Invalid comment id',
	  		data:{}
	  	});
	}
	Comment.findOne({_id:comment_id}).then(async (comment)=>{
		if(!comment){
			return res.status(400).send({
				message:'No idea found',
				data:{}
			});	
		}else{
				try{
					await Comment.deleteOne({_id:comment_id})
					await Idea.updateOne(
						{_id:comment.idea_id},
						{
							$pull:{comment:comment_id}
						}
					)

					return res.status(200).send({
						message:'Comment successfully deleted',
						data:{}
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
	})
}
  const updateComment = async (req, res) => {
	let comment_id=req.params.comment_id;
	if(!mongoose.Types.ObjectId.isValid(comment_id)){
		return res.status(400).send({
	  		message:'Invalid comment id',
	  		data:{}
	  	});
	}

	Comment.findOne({_id:comment_id}).then(async (comment)=>{
		if(!comment){
			return res.status(400).send({
				message:'No comment found',
				data:{}
			});	
		}else{
			let current_user=req.user;

			if(comment.user_id!=current_user._id){
				return res.status(400).send({
					message:'Access denied',
					data:{}
				});	
			}else{
				try{
					const v = new Validator(req.body, {
						comment:'required',
					});
					const matched = await v.check();
					if (!matched) {
						return res.status(422).send(v.errors);
					}
					await Comment.updateOne({_id:comment_id},{
						comment:req.body.comment,
						
					});
					return res.status(200).send({
						message:'Comment successfully updated',
						data:comment[0]
					});
				}catch(err){
					return res.status(400).send({
				  		message:err.message,
				  		data:err
				  	});
				}		
			}
		}
	}).catch((err)=>{
		return res.status(400).send({
	  		message:err.message,
	  		data:err
	  	});
	})
}
const replyComment = async (req, res) => {
	

	let comment_id=req.params.comment_id;
	if(!mongoose.Types.ObjectId.isValid(comment_id)){
		return res.status(400).send({
	  		message:'Invalid comment id',
	  		data:{}
	  	});
	}

	Comment.findOne({_id:comment_id}).then(async (comment)=>{
		if(!comment){
			console.log(comment)





			return res.status(400).send({
				message:'No comment found',
				data:{}
			});	
		}else{	
				try{
					await Comment.updateOne({_id:comment_id},{
						$push:{
							"reply":{user_id:req.body.user_id,replycomment:req.body.replycomment,isAnonymityReply:req.body.isAnonymityReply}
						}
					});
					return res.status(200).send({
						message:'Reply comment successfully',
						data:comment[0]
					});
				}catch(err){
					return res.status(400).send({
				  		message:err.message,
				  		data:err
				  	});
				}		
			}
		})
	}
	const deletereplyComment = async (req, res) => {
		let comment_id=req.params.comment_id;
		let replycommentId=req.params.replycommentId;
		if(!mongoose.Types.ObjectId.isValid(comment_id)){
			return res.status(400).send({
				  message:'Invalid comment id',
				  data:{}
			  });
		}
		if(!mongoose.Types.ObjectId.isValid(replycommentId)){
			return res.status(400).send({
				  message:'Invalid comment id',
				  data:{}
			  });
		}
		Comment.findOne({_id:comment_id}).then(async (comment)=>{
			if(!comment){
				return res.status(400).send({
					message:'No comment found',
					data:{}
				});			
			}else{
				{
					let current_user=req.user;
					let usercomment=comment.reply;
					if(current_user.user_id!=usercomment.user_id){
						return res.status(400).send({
							message:'Access denied',
							data:{}
						});	
			}
			else{	
					try{
						await Comment.updateOne({_id:comment_id},{
							$pull:{
									
								"reply":{_id: replycommentId}
							}
						});
						return res.status(200).send({
							message:'Delete reply comment successfully',
							data:comment[0]
						});
					}catch(err){
						return res.status(400).send({
							  message:err.message,
							  data:err
						  });
					}		
				}
			}
		}})
			
		}
		const editreplyComment = async (req, res) => {
			let comment_id=req.params.comment_id;
			let replycommentId=req.params.replycommentId;
			if(!mongoose.Types.ObjectId.isValid(comment_id)){
				return res.status(400).send({
					  message:'Invalid comment id',
					  data:{}
				  });
			}
			if(!mongoose.Types.ObjectId.isValid(replycommentId)){
				return res.status(400).send({
					  message:'Invalid comment id',
					  data:{}
				  });
			}
			Comment.findOne({_id:comment_id}).then(async (comment)=>{
				if(!comment){
					return res.status(400).send({
						message:'No comment found',
						data:{}
					});			
				}else
				{
					let current_user=req.user;
					if(current_user){
						return res.status(400).send({
							message:'Access denied',
							data:{}
						});	
					}else{
						try{
							const v = new Validator(req.body, {
								replycomment:'required',
							});
							const matched = await v.check();
							if (!matched) {
								return res.status(422).send(v.errors);
							}
							await Comment.updateOne({_id:replycommentId},{
								comment:req.body.comment,
								
							});
							return res.status(200).send({
								message:'Reply Comment successfully updated',
								data:comment[0]
							});
						}catch(err){
							return res.status(400).send({
								  message:err.message,
								  data:err
							  });
						}		
					}
				}
				})
			}

module.exports={
    getComment:getComment,
    createComment:createComment,
    deleteComment:deleteComment,
    updateComment:updateComment,
	replyComment:replyComment,
	deletereplyComment:deletereplyComment,
	editreplyComment:editreplyComment,
}