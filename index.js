const express = require("express");
const app = express();

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5501"); // update to match the domain you will make the request from
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

const storedData = [];

app.get("/", (req, res) => {
    console.log("Requisição GET concluída!");
    res.send("API funcionando!");
});

app.put("/clima", (req, res) => {
    // const data = req.body;
    // storedData.push(data);
    for (const key in req.body) {
        if (data.hasOwnPropery(key)) {
            data[key] = req.body[key];
        }
    }

    res.send("Dados recebidos e armazenados!");
});

app.get("/clima", (req, res) => {
    res.send(storedData);
});

app.listen(process.env.PORT || 5501);
