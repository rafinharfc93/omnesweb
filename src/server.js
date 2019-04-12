// Importando a dependência 
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

// criando a função app referente ao express
const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
    socket.on('connectRom', box => {
        socket.join(box);
    })
});

//conectando ao bd
mongoose.connect('mongodb+srv://omnesweb:omnesweb@cluster0-8t6za.mongodb.net/omnesweb?retryWrites=true',
 {
    useNewUrlParser: true
 }
);

app.use((req, res, next) => {
    req.io = io;

    return next();
});

//Adicionando a função de ler json
app.use(express.json());
//Adicionando a possibilidade do json ler arquivos
app.use(express.urlencoded({ extended: true}));
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

//importando o arquivo routes.js
app.use(require("./routes"));

server.listen(process.env.PORT || 1993);