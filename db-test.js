const { MongoClient } = require("mongodb");

const uriDirect = "mongodb://abaoel_db_user:NfLF8wKuStDFfLwN@ac-wtkgi3j-shard-00-00.owtte45.mongodb.net:27017,ac-wtkgi3j-shard-00-01.owtte45.mongodb.net:27017,ac-wtkgi3j-shard-00-02.owtte45.mongodb.net:27017/job-board?tls=true&replicaSet=atlas-comqsm-shard-0&authSource=admin&retryWrites=true&w=majority";

async function testUri() {
  const client = new MongoClient(uriDirect, {
    serverSelectionTimeoutMS: 5000,
  });

  try {
    await client.connect();
    console.log("Connected successfully!");
  } catch (error) {
    console.error("Connection failed:", error.message);
    if (error.reason) {
      console.error("Reason:", error.reason);
    }
  } finally {
    await client.close();
  }
}

testUri();
