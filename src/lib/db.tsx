// src/lib/db.ts
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function connectToDatabase() {
  if (!client.topology.isConnected()) await client.connect();
  const db = client.db('CVApp');
  return { db, client };
}
