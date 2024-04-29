const express = require("express")
const {handleGenerateShortUrl, handleAnalytics} = require("../controllers/C-url")
const router = express.Router()

router.post("/url",handleGenerateShortUrl)

router.get("/analytics/:shortId", handleAnalytics)

module.exports = router