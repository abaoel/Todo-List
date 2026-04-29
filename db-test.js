const { MongoClient } = require("mongodb");

const uriDirect = "";

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
