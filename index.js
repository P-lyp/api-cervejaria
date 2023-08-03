// FIREBASE

const express = require("express");
const app = express();
const firebase = require("firebase");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const firebaseConfig = {
    apiKey: "AIzaSyBbHMX-6cW5lWUpdL8bEn3nkndgIam_chw",
    authDomain: "bd-cervejaria.firebaseapp.com",
    projectId: "bd-cervejaria",
    storageBucket: "bd-cervejaria.appspot.com",
    messagingSenderId: "893426681360",
    appId: "1:893426681360:web:81132b0e042e9bc55a2c95",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const nomes = db.collection("nomes");

const storedData = [];

app.get("/", (req, res) => {
    console.log("Requisição GET concluída!");
    res.send("API funcionando!");
});

app.put("/clima", async (req, res) => {
    const newData = req.body;
    await nomes.add(newData);

    res.send("Dado armazenado com sucesso!");
});

// app.post("/clima", (req, res) => {
//     const data = req.body;
//     storedData.push(data);
//     res.send(newData);
// });

app.get("/clima", (req, res) => {
    res.send(storedData);
});

app.listen(process.env.PORT || 3000);
