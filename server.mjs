import express from 'express';
import axios from 'axios';
import JSONbig from 'json-bigint';

const app = express();
const PORT = 3000;

const DATA_URL = 'https://foyzulhassan.github.io/files/favs.json';

// Fetch the JSON data from the URL
async function fetchData() {
    const response = await axios.get(DATA_URL, { transformResponse: data => JSONbig.parse(data) });
    return response.data;
}

// Get all tweets (create time, id, and text)
app.get('/tweets', async (req, res) => {
    try {
        const data = await fetchData();
        const tweets = data.map(tweet => ({
            created_at: tweet.created_at,
            id: tweet.id,
            text: tweet.text
        }));
        res.json(tweets);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Get all external links grouped by tweet ids
app.get('/tweets/links', async (req, res) => {
    try {
        const data = await fetchData();
        const urlRegex = /(https?:\/\/[^\s]+)/g; // regular expressions

        const linksByTweet = data.reduce((acc, tweet) => {
            if (tweet.text) {
                const links = tweet.text.match(urlRegex) || [];
                if (links.length) acc[tweet.id.toString()] = links;
            }
            return acc;
        }, {});

        res.json(linksByTweet);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});


// Get tweet details by tweet ID
app.get('/tweets/:id', async (req, res) => {
    try {
        const data = await fetchData();
        const tweet = data.find(t => t.id == req.params.id);
        if (tweet) {
            res.json({
                created_at: tweet.created_at,
                text: tweet.text,
                user_screen_name: tweet.user.screen_name
            });
        } else {
            res.status(404).json({ error: 'Tweet not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Get user profile details by screen name
app.get('/user/:screen_name', async (req, res) => {
    try {
        const data = await fetchData();
        const tweet = data.find(t => t.user.screen_name === req.params.screen_name);
        if (tweet) {
            res.json({
                location: tweet.user.location,
                description: tweet.user.description,
                followers_count: tweet.user.followers_count,
                friends_count: tweet.user.friends_count
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
