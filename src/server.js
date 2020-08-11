// Como iniciar o servidor Express:
// node src/server.js
// a cada nova alteracao nas linhas abaixo, e necessario reiniciar o servidor Express
// para nao precisar ficar reiniciando, basta usar o "nodemon"
// adicionado aos scripts do package.json:
// "dev": "nodemon src/server.js"
// para executar o nodemon:
// npm run dev
// require("express")()
// http://127.0.0.1:5500
// .get("/", (req, res) => {
//     return res.send("Hi from NLW")
// })
// http://127.0.0.1:5500/study
// .get("/study", (req, res) => {
//     return res.send("Study")
// })
// .listen(5500);

// Dados
// const proffys = [
//     { 
//         name: "Diego Fernandes", 
//         avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
//         whatsapp: "123456789",
//         bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
//         subject: "Química",
//         cost: "20",
//         weekday: [0],
//         time_from: [720],
//         time_to: [1220]
//      },
//      { 
//         name: "Mayk Brito", 
//         avatar: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
//         whatsapp: "123456789",
//         bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
//         subject: "Química",
//         cost: "20",
//         weekday: [1],
//         time_from: [720],
//         time_to: [1220]
//      }
// ]

// Servidor
// require("express")()
const express = require("express");
const server = express();

const { 
    pageLanding, 
    pageStudy, 
    pageGiveClasses, 
    saveClasses
} = require("./pages")

//configurar nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("./src/views", {
    express: server,
    noCache: true,
})

// Inicio e configuracao do servidor
server
//recever os dados do req.body
.use(express.urlencoded({ extended: true }))
// configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))
// rotas da aplicacao
// http://127.0.0.1:5500
// .get("/", (req, res) => {
//     return res.sendFile(__dirname + "/views/index.html");
// })
.get("/", pageLanding)
// http://127.0.0.1:5500/study
// .get("/study", (req, res) => {
//     return res.sendFile(__dirname + "/views/study.html");
// })
.get("/study", pageStudy)
// http://127.0.0.1:5500/give-classes
// .get("/give-classes", (req, res) => {
//     return res.sendFile(__dirname + "/views/give-classes.html");
// })
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
// start do servidor
.listen(5500);

// mostra no nodemon o path do arquivo "server.js"
// console.log(__dirname);

// function thisIsAFunction() {
    // return "string";
    // return {
    //     "full-name": "Mayk"
    // };
// };

// thisIsAFunction();

// function express(){
//     return {
//         name: "Mayk",
//         age: 33
//     }
// }

// express().age