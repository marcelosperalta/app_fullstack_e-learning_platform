import "./public/styles/main.css"

const express = require("express");
const server = express();

const { 
    pageLanding, 
    pageStudy, 
    pageGiveClasses, 
    saveClasses
} = require("./pages")

// "nunjucks" configutarion 
const nunjucks = require("nunjucks");
nunjucks.configure("./src", {
    express: server,
    noCache: true,
})

// server configuration
server
// receive data from "req.body"
.use(express.urlencoded({ extended: true }))
// config static files (css, scripts, imagens)
.use(express.static("./src/public"))
// http://127.0.0.1:5500
.get("/", pageLanding)
// http://127.0.0.1:5500/study
.get("/study", pageStudy)
// http://127.0.0.1:5500/give-classes
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
// server start
.listen(5500);