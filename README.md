# twitter bot markov chain of @thisisaaronland

## Seed data

Tweets are extracted using the t twitter client:

	t timeline thisisaaronland -n 4000 -c > thisisaaronland.csv

Tweets with retweets, mentions, hashtags, and URLs are filtered:

	cat thisisaaronland.csv | grep -v "http://" | grep -v "RT " | grep -v "@" | grep -v "https://" | grep -v "#" > filtered.csv
	
Then we parse to get the raw tweets, removing quotes:

	node parse > seed.txt

## Installation

Create a file called secrets.json with the Twitter credentials:

	{
	    "consumer_key": "xxx",
	    "consumer_secret": "xxx",
	    "access_token_key": "xxx",
	    "access_token_secret": "xxx"
	}
	
Cronjob runs once an hour:

	0 * * * * /usr/bin/node /var/www/thisisaaronbot/app.js >> /var/www/thisisaaronbot/tweets.log 2>&1