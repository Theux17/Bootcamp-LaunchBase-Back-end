const express = require('express')
const nunjucks = require('nunjucks')

const server = express()


const card = require("./data")

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server
})

server.use(express.static('public'))

server.get("/", function(req, res){


    return res.render("courses", { cards: card})
})


server.get("/about", function (req, res) {
    const about = {
        logo: "https://pbs.twimg.com/profile_images/953595371875422210/0pWsfSSp_400x400.jpg",
        name: "Rocketseat",
        description: "Empresa apaixonada em ensinar quem está iniciando no mundo Dev e quem já é Dev, conheça os nossos conteúdos nos links abaixo. O nosso objetivo é levar você ao próximo nível!",
        subtitle: "Tecnologias Utilizadas:",
        technolgies: [
            { name: "HTML" },
            { name: "CSS" },
            { name: "JavaScript" }
        ],
        footerName: "Siga-Nos:",
        links: [
            { name: "Github", url: "https://github.com/Rocketseat" },
            { name: "instagram", url: "https://www.instagram.com/rocketseat_oficial/" },
            { name: "Facebok", url: "https://www.facebook.com/rocketseat" }


        ]
    }


    return res.render("about", { about })
})

server.get("/courses/:id", function(req, res){
    const id = req.params.id

    const course = card.find(function(course){
        return course.id == id
    })

    if(!course){
        return res.send("Content is not found")
    }

    return res.render("description", {card:course} )
})


server.use(function (req, res) {
    res.status(404).render("not-found");
})


server.listen(5000, function () {
    console.log("server is running")
})
