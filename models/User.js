const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://ender:123@cluster0.8auim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let client;

async function connect() {
  if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
  }
  return client;
}

async function createUser(user) {
  const db = client.db('Api_Web'); 
  const result = await db.collection('users').insertOne(user);
  return result;
}

async function findUser(query) {
  const db = client.db('Api_Web');
  const user = await db.collection('users').findOne(query);
  return user;
}

module.exports = {
  connect,
  createUser,
  findUser
};
