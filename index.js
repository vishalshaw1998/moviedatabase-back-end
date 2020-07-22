const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const mongoURL =
    "mongodb+srv://vishal:vishal@cluster1.xhmhh.mongodb.net/movies?retryWrites=true&w=majority";

app.get("/getAllMovie", async function (req, res) {
    try {
        let client = await mongodb.connect(mongoURL);
        let db = client.db("movies");
        let data = await db.collection("movies").find();
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});
app.get("/getSingleMovie", async function (req, res) {
    try {
        let client = await mongodb.connect(mongoURL);
        let db = client.db("movies");
        let data = await db
            .collection("movies")
            .find({ title: req.body.title })
            .toArray();
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});
app.get("/getById/:id", async (req, res) => {
    const id = req.params.id;
    try {
        let client = await mongodb.connect(mongoURL);
        let db = client.db("movies");
        let data = await db
            .collection("movies")
            .find({ _id: mongodb.ObjectId(id) })
            .toArray();
        res.send(data);
    } catch (err) {
        console.log(err);
    }
});
app.post("/addMovie", async (req, res) => {
    let client = await mongodb.connect(mongoURL);
    let db = client.db("movies");
    let data = await db.collection("movies").insertOne(req.body);
    console.log(req.body);
    res.json({
        status: "OK",
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Listening");
});