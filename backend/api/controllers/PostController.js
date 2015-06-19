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
			
			var T = new Twit({
			    consumer_key: config.TWITTER_KEY,
				consumer_secret: config.TWITTER_SECRET,
				access_token: user.twitterToken,
				access_token_secret: user.twitterSecret
			});

			T.post('statuses/update', {
				status: message
			}, function(err, data, response) {
			  console.log(data, err)
			});
		});

	}
};
