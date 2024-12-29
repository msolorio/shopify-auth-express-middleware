import { MongoClient } from 'mongodb';

export const mongoClient = new MongoClient(String(process.env.MONGODB_URI));

export const deleteAllRecordsMongo = async (dbName: string) => {
  try {
    await mongoClient.connect();
    await mongoClient
      .db(dbName)
      .collection('shops')
      .deleteMany({});
  } catch (error) {
    console.error('Error deleting records:', error);
  } finally {
    await mongoClient.close();
  }
};
