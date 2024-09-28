const express = require('express')
const app = express()
const mongodb = require ('mongodb');
const bodyParser = require ('body-parser');


//llamar al bodey-parser
app.use(bodyParser.json());
//Importar las rutas

const usersRoute = require('./routes/user')
app.use('/usuarios', usersRoute);
const loginRoute = require('./routes/login');
app.use('/login', loginRoute);

//ruta de prueba
app.get('/', (req, res) => {
  res.send('Prueba 1 de servidor!')
})

//mogodb
//conexion a la bd
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ender:123@cluster0.8auim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.listen(10000);
console.log('El servidor está corriendo en el puerto 10000');