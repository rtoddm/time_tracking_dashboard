require("dotenv").config();

const { MongoClient } = require("mongodb");
const activities = require("./data.json");

const connectionString = process.env.MONGODB_URI;
const client = new MongoClient(connectionString);

async function seedDatabase() {
  try {
    await client.connect();

    const database = client.db("time_tracking_dashboard");
    const collection = database.collection("activities");

    const existingDocuments = await collection.countDocuments();

    if (existingDocuments > 0) {
      console.log("The activities collection already contains data.");
      return;
    }

    const result = await collection.insertMany(activities);

    console.log(`Inserted ${result.insertedCount} activities.`);
  } catch (error) {
    console.error("Unable to seed the database:", error);
  } finally {
    await client.close();
  }
}

seedDatabase();
