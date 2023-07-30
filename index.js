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
    const data = req.body;

    const existingDataIndex = storedData.findIndex((item) => {
        Object.keys(item).some((key) => item[key] === data[key]);
    });

    if (existingDataIndex !== -1) {
        const existingData = storedData[existingDataIndex];
        for (const key in data) {
            existingData[key] = data[key];
        }
        console.log("Dados armazenados:", existingData);
        res.send("Dados recebidos e armazenados!");
    } else {
        storedData.push(data);
        console.log("Dados armazenados:", data);
        res.send("Dados recebidos e armazenados!");
    }
});

app.get("/clima", (req, res) => {
    res.send(storedData);
});

app.listen(process.env.PORT || 5501);
