/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
	tweet: function(req, res){

		User.findOne(req.userId, function(err, user){
			console.log(user);
			
			var message = req.body.message;
			var datetime = req.body.scheduledTime;
			var owner = req.userId;
			
			Post.create({
				message: message,
				isPosted: false,
				scheduledTime: datetime,
				owner: owner
			}).exec(function(err, post){
				console.log('working', post, err);
				res.status(200).end();
			});
		});

	},
	
	myPosts: function (req, res){
		Post.find({owner:req.userId}, function(err, posts){
			res.json(posts);
		});
	}
};
