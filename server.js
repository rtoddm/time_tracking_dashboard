require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

const client = new MongoClient(process.env.MONGODB_URI);

app.use(express.static("public"));

app.get("/api/activities", async (request, response) => {
  try {
    const database = client.db("time_tracking_dashboard");

    const activities = await database.collection("activities").find().toArray();

    response.json(activities);
  } catch (error) {
    console.error("Unable to retrieve activities:", error);

    response.status(500).json({
      message: "Unable to retrieve activities",
    });
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to server:", error);
  }
}

startServer();
