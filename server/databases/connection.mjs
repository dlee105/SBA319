import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let connection;

try {
  connection = await client.connect();
} catch (err) {
  console.log(err);
}

let db = connection.db("SBA319");

export default db;
