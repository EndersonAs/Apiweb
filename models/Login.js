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

async function createLogin(login) {
  const db = client.db('Api_Web'); // Reemplaza 'testdb' con el nombre de tu base de datos
  const result = await db.collection('logins').insertOne(login);
  return result;
}

module.exports = {
  connect,
  createLogin
};
