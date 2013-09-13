var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream(__dirname + '/filtered.csv'),
    output: process.stdout,
    terminal: false
});

rd.on('line', function(line) {

	var parts = line.split(",",4)
	
	if (parts.length === 4) {

		var tweet = parts[3];

		tweet = tweet.replace(/"/g, "");
		tweet = tweet.replace(/“/g, "");
		tweet = tweet.replace(/”/g, "");
		tweet = tweet.trim();

		if (tweet !== "" && tweet !== "Text") {
		    console.log(tweet);
		}

	}


});