var sails = require('sails');
var Twit = require('twit');

sails.load(function(){
	setInterval(function(){
		checkPosts();
	}, 1000);
});

function checkPosts(){
	Post.find().where({
		scheduledTime : { 
			'<': new Date()
			}
	})
	.populate('owner')
	.exec(function(err, posts){
		posts.forEach(function(post){
			sendTweet(post.owner.twitterToken, post.owner.twitterSecret, post.message);
		});
	});
}

function sendTweet(token, secret, message){
	
	var T = new Twit({
	    consumer_key: config.TWITTER_KEY,
		consumer_secret: config.TWITTER_SECRET,
		access_token: token,
		access_token_secret: secret
	});

	T.post('statuses/update', {
		status: message
	}, function(err, data, response) {
	    console.log('sent successfully', err)
	});
	
}


