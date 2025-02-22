import { MongoClient } from 'mongodb';
import 'dotenv/config'; // Ensure .env file is loaded

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("❌ MONGODB_URI is not defined. Check your environment variables.");
}
console.log("✅ Connecting to MongoDB at:", uri);

const client = new MongoClient(uri);

export async function connectToDatabase() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  const db = client.db(process.env.MONGODB_DB);
  return { db, client };
}
