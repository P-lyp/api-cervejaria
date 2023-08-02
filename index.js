const express = require("express");
const app = express();
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
//
// curl -i https://some-app.cyclic.app/myFile.txt
app.get("*", async (req, res) => {
    let filename = req.path.slice(1);

    try {
        let s3File = await s3
            .getObject({
                Bucket: "cyclic-misty-boa-garment-sa-east-1",
                Key: "teste.json",
            })
            .promise();

        res.set("Content-type", s3File.ContentType);
        res.send(s3File.Body.toString()).end();
    } catch (error) {
        if (error.code === "NoSuchKey") {
            console.log(`No such key ${filename}`);
            res.sendStatus(404).end();
        } else {
            console.log(error);
            res.sendStatus(500).end();
        }
    }
});

// curl -i -XPUT --data '{"k1":"value 1", "k2": "value 2"}' -H 'Content-type: application/json' https://some-app.cyclic.app/myFile.txt
app.put("*", async (req, res) => {
    let filename = req.path.slice(1);

    console.log(typeof req.body);

    await s3
        .putObject({
            Body: JSON.stringify(req.body),
            Bucket: "cyclic-misty-boa-garment-sa-east-1",
            Key: "teste.json",
        })
        .promise();

    res.set("Content-type", "text/plain");
    res.send("ok").end();
});

// curl -i -XDELETE https://some-app.cyclic.app/myFile.txt
app.delete("*", async (req, res) => {
    let filename = req.path.slice(1);

    await s3
        .deleteObject({
            Bucket: "cyclic-misty-boa-garment-sa-east-1",
            Key: "teste.json",
        })
        .promise();

    res.set("Content-type", "text/plain");
    res.send("ok").end();
});

// /////////////////////////////////////////////////////////////////////////////
// Catch all handler for all other request.
app.use("*", (req, res) => {
    res.sendStatus(404).end();
});

// /////////////////////////////////////////////////////////////////////////////
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`index.js listening at http://localhost:${port}`);
});

// const express = require("express");
// const app = express();

// app.use(express.json());

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5501"); // update to match the domain you will make the request from
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });

// const storedData = [];

// app.get("/", (req, res) => {
//     console.log("Requisição GET concluída!");
//     res.send("API funcionando!");
// });

// app.put("/clima", (req, res) => {
//     const newData = req.body;
//     storedData.push(newData);
//     if (storedData.length > 1) {
//         storedData.shift();
//     }

//     res.send(newData);
// });

// // app.post("/clima", (req, res) => {
// //     const data = req.body;
// //     storedData.push(data);
// //     res.send(newData);
// // });

// app.get("/clima", (req, res) => {
//     res.send(storedData);
// });

// app.listen(process.env.PORT || 5501);
