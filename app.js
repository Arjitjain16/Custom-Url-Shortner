const express = require("express")
const urlRoute = require("./routes/R-url")
const {connectMongodb} = require("./connection")
const URL = require('./models/url')
var app = express()

const port = 9001;

connectMongodb('mongodb://localhost:27017/short-url').then(()=>{
    console.log("mongodb connected")
})

app.use(express.json())

app.use("/url", urlRoute)

app.get('/:shortId', async(req, res)=>{
    const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
})





app.listen(port,()=>console.log(`Server running on ${port} `))