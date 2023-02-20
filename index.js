require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URI
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

const run = async () => {
    try {
        const db = client.db("jobbox");
        const userCollection = db.collection("user");
        const jobCollection = db.collection("job");

        app.post("/user", async (req, res) => {
            const user = req.body;

            const result = await userCollection.insertOne(user);

            res.send(result);
        });

        app.get("/user/:email", async (req, res) => {
            const email = req.params.email;

            const result = await userCollection.findOne({ email });

            if (result?.email) {
                return res.send({ status: true, data: result });
            }

            res.send({ status: false });
        });
    } finally {

    }
}

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});