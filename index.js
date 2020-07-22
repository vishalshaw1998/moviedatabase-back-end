const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

const mongoURL =
    "mongodb+srv://vishal:vishal@cluster1.xhmhh.mongodb.net/movies?retryWrites=true&w=majority";

app.get("/getAllMovie", async function (req, res) {
    try {
        let client = await mongodb.connect(mongoURL);
        let db = client.db("movies");
        let data = await db.collection("movies").find().toArray();
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});
app.get("/getSingleMovie", async function (req, res) {
    const query = req.query.movieName.slice(1, -1);
    try {
        let client = await mongodb.connect(mongoURL);
        let db = client.db("movies");
        console.log(query);
        let data = await db
            .collection("movies")
            .find({ title: query })
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
    try {
        let client = await mongodb.connect(mongoURL);
        let db = client.db("movies");
        let data = await db.collection("movies").insertOne(req.body);
        let insertedData = await db
            .collection("movies")
            .find({})
            .sort({ _id: -1 })
            .limit(1)
            .toArray();
        console.log(req.body);
        res.json({
            insertedData: insertedData,
        });
    } catch (error) {
        console.log(error);
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Listening");
});
