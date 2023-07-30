const express = require("express");
const app = express();

app.use(express.json());

const storedData = [];

app.get("/", (req, res) => {
    console.log("Just got a request!");
    res.send("Yo!");
});

app.post("/store", (req, res) => {
    const data = req.body;
    storedData.push(data);
    console.log("Dados armazenados:", data);
    res.send("Dados recebidos e armazenados!");
});

app.get("/store", (req, res) => {
    res.send(storedData);
});

app.listen(process.env.PORT || 5501);
