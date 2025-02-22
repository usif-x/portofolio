import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

export async function connectToDatabase() {
  if (!client.isConnected) await client.connect()
  const db = client.db(process.env.MONGODB_DB)
  return { db, client }
}