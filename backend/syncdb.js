const { MongoClient } = require("mongodb");
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const LOCAL_URI = "mongodb://localhost:27017/todo";
const CLOUD_URI = "mongodb+srv://poojapal_db_user:9DawiHWTnIq7VlkI@cluster0.ogaddeq.mongodb.net/todo?appName=Cluster0";

const DB_NAME = "your_database_name";

async function migrateDatabase() {
  const localClient = new MongoClient(LOCAL_URI);
  const cloudClient = new MongoClient(CLOUD_URI);

  try {
    await localClient.connect();
    await cloudClient.connect();

    console.log("Connected to both databases");

    const localDb = localClient.db(DB_NAME);
    const cloudDb = cloudClient.db(DB_NAME);

    // Get all collections
    const collections = await localDb.listCollections().toArray();

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;

      console.log(`Migrating collection: ${collectionName}`);

      const localCollection = localDb.collection(collectionName);
      const cloudCollection = cloudDb.collection(collectionName);

      // Fetch all documents
      const documents = await localCollection.find({}).toArray();

      if (documents.length > 0) {
        // Optional: clear existing cloud collection
        await cloudCollection.deleteMany({});

        // Insert into cloud
        await cloudCollection.insertMany(documents);

        console.log(
          `Inserted ${documents.length} documents into ${collectionName}`
        );
      } else {
        console.log(`No documents found in ${collectionName}`);
      }
    }

    console.log("Database migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await localClient.close();
    await cloudClient.close();
  }
}

migrateDatabase();