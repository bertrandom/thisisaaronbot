var util = require('util');
var fs = require('fs');

var markov = require('markov');
var m = markov(1);

var s = fs.createReadStream(__dirname + '/seed.txt');

var secrets = require(__dirname + '/secrets.json');

m.seed(s, function () {

	var generateLine = function() {

		var line = '';

		var words = m.fill(m.pick());
		for (var i = 0; i < words.length; i++) {

			var sentence = line + (line === "" ? "" : " ") + words[i];
			if (sentence.length > 68) {
				break;
			} else {
				line = sentence;
			}

		}

		return line;

	}

	var tweet = generateLine() + ' / ' + generateLine();

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