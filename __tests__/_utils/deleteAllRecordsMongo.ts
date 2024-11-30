import { MongoClient } from 'mongodb';

export const mongoClient = new MongoClient(String(process.env.MONGODB_URI));

export const deleteAllRecordsMongo = async () => {
  try {
    await mongoClient.connect();
    await mongoClient
      .db('shopify')
      .collection('shops')
      .deleteMany({});
  } catch (error) {
    console.error('Error deleting records:', error);
  } finally {
    await mongoClient.close();
  }
};
