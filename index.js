const express = require("express");
const app = express();

const AWS = require("aws-sdk");
const s3 = new AWS.S3();

app.use(express.json());
//
// store something
await s3
    .putObject({
        Body: JSON.stringify({ key: "value" }),
        Bucket: "cyclic-misty-boa-garment-sa-east-1",
        Key: "some_files/my_file.json",
    })
    .promise();

// get it back
let my_file = await s3
    .getObject({
        Bucket: "cyclic-misty-boa-garment-sa-east-1",
        Key: "some_files/my_file.json",
    })
    .promise();

console.log(JSON.parse(my_file));

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
