import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI_ATLAS_PROD!;
const dbName = process.env.DB_NAME_ATLAS_PROD!;

const client = new MongoClient(uri);
const clientPromise = client.connect();

export { clientPromise, dbName };
