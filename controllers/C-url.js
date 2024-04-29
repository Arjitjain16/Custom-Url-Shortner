const shortid = require('shortid')
const URL = require('../models/url')

async function handleGenerateShortUrl(req, res){
    const body = req.body;
    if (!body.url) return res.status(400).json({error: 'url is required'})
    const shortId = shortid.generate(8)

    try {
        // Create a new URL document with shortId
        const newUrl = await URL.create({
            shortId: shortId, // Ensure shortId is passed correctly
            reDirectUrl: body.url,
            visitHistory: []
        });
        return res.json({ id: newUrl.shortId });
    } catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}

async function handleAnalytics(req, res){
    const shortId = req.param.shortId
    const result = await URL.findOne({shortId})
    return res.json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory
    })
}

module.exports = {handleGenerateShortUrl , handleAnalytics};