const express = require('express');
const Twitter = require('twit');
const app = express();

app.use(express.static('public'));

let twitterConfig = {
    consumer_key: 'ZzGoBOM1JTcFAivH80Hxw',
    consumer_secret: '0JOL3dlqd0V6VGX4bodWj0pQ1PYiwo98rmLti0BRpw',
}
let client = null;
app.use(require('cors')());
app.use(require('body-parser').json());
app.get('/api/authenticate',(req, res) => {
    twitterConfig.access_token = req.query.access_token;
    twitterConfig.access_token_secret = req.query.access_token_secret;
    client = new Twitter(twitterConfig);
    client.get( 'account/verify_credentials')
    .then(user => {
        res.send("ok");
    })
        .catch(error => {res.send("error");})
});

app.get('/api/home', (req, res) => {
    if (!client) {
        res.send('need authentication');
    }else{
        const params = {count: 10};
        client.get('statuses/home_timeline',params)
            .then(timeline => {
                res.send(timeline);
            })
            .catch(error => {
                res.send(error);
            });
    }
});

app.listen(3000, () => console.log("Server is listening at the port " + 3000));