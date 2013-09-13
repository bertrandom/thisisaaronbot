var util = require('util');
var fs = require('fs');

var markov = require('markov');
var m = markov(1);

var s = fs.createReadStream(__dirname + '/seed.txt');

var secrets = require(__dirname + '/secrets.json');

m.seed(s, function () {

	var generateLine = function(maxLength) {

		var line = '';

		var picked_words = [];
		var words = m.fill(m.pick());

		for (var i = 0; i < words.length; i++) {

			picked_words.push(words[i]);

			if (picked_words.join(" ").length > maxLength) {
				picked_words.pop();
				break;
			}

		}

		if (picked_words[picked_words.length - 1] === "a") {
			picked_words.pop();
		}

		line = picked_words.join(" ");

		return line;

	};

	var maxLength1 = Math.floor(Math.random()*(98-38+1)+38);
	var maxLength2 = 140 - 3 - maxLength1;

	var tweet = generateLine(maxLength1) + ' / ' + generateLine(maxLength2);

	var twitter = require('twitter');
	var twit = new twitter(secrets);

	console.log('Tweeting "' + tweet + '"');

	twit.updateStatus(tweet, {
		lat: "0.0",
		long: "0.0",
		"display_coordinates": true
	}, function(data) {

		if (data && data.id) {
			console.log('Tweet successful.');
		} else {
			console.log('Tweet failed.');
		}

	});

});