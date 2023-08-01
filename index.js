const express = require("express");
const app = express();

process.env.CYCLIC_DB = "misty-boa-garmentCyclicDB";

const CyclicDb = require("@cyclic.sh/dynamodb");
const db = CyclicDb("misty-boa-garmentCyclicDB");

const animals = db.collection("animals");

const run = async function () {
    let animals = db.collection("animals");

    // create an item in collection with key "leo"
    let leo = await animals.set("leo", {
        type: "cat",
        color: "orange",
    });

    // get an item at key "leo" from collection animals
    let item = await animals.get("leo");
    console.log(item);
};
run();

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
    const newData = req.body;
    storedData.push(newData);
    if (storedData.length > 1) {
        storedData.shift();
    }

    res.send(newData);
});

// app.post("/clima", (req, res) => {
//     const data = req.body;
//     storedData.push(data);
//     res.send(newData);
// });

app.get("/clima", (req, res) => {
    res.send(storedData);
});

app.listen(process.env.PORT || 5501);
