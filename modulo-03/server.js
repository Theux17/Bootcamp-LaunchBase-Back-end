const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")


server.use(express.static('public'))


server.set("view engine", "njk")


nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function (req, res) {
    const about = {
        avatar: "https://pbs.twimg.com/media/EL88AGyXsAUKjnK?format=jpg&name=large",
        name: "Matheus Silva",
        role: "Futuro Desenvolvedor Web",
        description: 'Cursando o curso LaunchBase da <a href="https://rocketseat.com.br" target="blank">Rocketseat</a>, em busca do primeiro emprego como Dev!',
        links: [
            { name: "Twiiter", url: "https://twitter.com/theux_17" },
            { name: "Instagram", url: "https://www.instagram.com/theux_17/" }
        ]

    }

    return res.render("about", {about}) 
})

server.get("/portfolio", function (req, res) {
    return res.render("portfolio", { items: videos })
})

server.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if(!video) {
        return res.send("Video is not found") 
    }


    return res.render("video", {item:video})

})

server.listen(5000, function () {
    console.log("server is running")
})
