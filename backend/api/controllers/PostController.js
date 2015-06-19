/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Twit = require('twit');

module.exports = {
	tweet: function(req, res){

		User.findOne(req.userId, function(err, user){
			console.log(user);
			
			var message = req.body.message;
			var datetime = req.body.datetime;
			var owner = req.userId;
			
			Post.create({
				message: message,
				datetime: datetime,
				owner: owner
			}).exec(function(err, post){
				console.log('working', post, err);
			});
			
//			var T = new Twit({
//			    consumer_key: config.TWITTER_KEY,
//				consumer_secret: config.TWITTER_SECRET,
//				access_token: user.twitterToken,
//				access_token_secret: user.twitterSecret
//			});
//
//			T.post('statuses/update', {
//				status: message
//			}, function(err, data, response) {
//			  console.log(data, err)
//			});

		});

	},
	
	myPosts: function (req, res){
		Post.find({owner:req.userId}, function(err, posts){
			res.json(posts);
		});
	}
};
