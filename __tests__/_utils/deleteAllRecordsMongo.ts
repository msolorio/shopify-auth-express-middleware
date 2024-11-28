import { mongoClient } from '#src/sessionStore/mongoDbSessionStore';

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
