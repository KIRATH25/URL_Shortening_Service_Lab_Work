const app = express();
app.use(express.json());

// DB
mongoose.connect('mongodb://localhost:27017/urlshortener', { useNewUrlParser: true, useUnifiedTopology: true });

// URL Schema
const urlSchema = new mongoose.Schema({
    longUrl: String,
    shortId: String,
    accessCount: { type: Number, default: 0 }
});
const Url = mongoose.model('Url', urlSchema);

// POST /shortUrl
app.post('/shortUrl', async (req, res) => {
    const { longUrl } = req.body;
    const shortId = shortid.generate();
    const newUrl = new Url({ longUrl, shortId });
    await newUrl.save();
    res.json({ shortUrl: `http://localhost:3000/${shortId}` });
});

// GET /:shortId
app.get('/:shortId', async (req, res) => {
    const { shortId } = req.params;
    const url = await Url.findOne({ shortId });
    if (url) {
        url.accessCount++;
        await url.save();
        res.redirect(url.longUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

// PATCH /:shortId
app.patch('/:shortId', async (req, res) => {
    const { shortId } = req.params;
    const { longUrl, accessCount } = req.body;
    const update = {};
    if (longUrl) update.longUrl = longUrl;
    if (accessCount !== undefined) update.accessCount = accessCount;
    const url = await Url.findOneAndUpdate({ shortId }, update, { new: true });
    if (url) {
        res.json(url);
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

const http= require(http);
const fs= require(fs);
const os= require(os);
const path= require(path);
const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');

