const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const https = require('https');
const fs = require('fs');
const request = require('request');
var bodyParser = require('body-parser')
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});

app.get('/video-detail', async (req, res) => {
    var URL = req.query.URL;
    res.header('content-disposition', 'attachment;filename="video.mp4')
    const videoId = await ytdl.getVideoID(URL)
    let info = await ytdl.getInfo(videoId);
    const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    const { formats, videoDetails, author } = info;
    const videoFormat = formats.filter(val => {
        if (val.qualityLabel) {
            return { ...val };
        }
    })
    res.send({ videoFormat, author, thumbnail, videoDetails });
})

app.get('/download', async (req, res) => {
    let { url, itag } = req.query;
    let id = ytdl.getURLVideoID(url);

    ytdl.getInfo(id, (err, info) => {
        if (err) {
            console.log(err);
            throw err;
        }
        else{
            let audioandvideo = ytdl.filterFormats(info.formats, 'audioandvideo');       
            let video = audioandvideo.filter(obj => obj.itag === itag);

            video = video[0]

            res.header('Content-Disposition', `attachment; filename="${info.title}.${video.container}"`);
            res.header('Content-Type', 'video/webm');

            ytdl(url, {
                format: video
            }).pipe(res); 
        }             
    })
})