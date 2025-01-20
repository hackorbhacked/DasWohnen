const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI || "mongodb+srv://hackorbhacked:ouvF2b64Jl1TcM2u@daswos.0orho.mongodb.net/shopping_site?retryWrites=true&w=majority";

async function connectToDatabase() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB Atlas!');
    return client.db('shopping_site');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/products', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const products = await db.collection('products').find({}).toArray();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching products');
  }
});

app.get('/products/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
    const db = await connectToDatabase();
    const collection = db.collection('products');

    const product = await collection.findOne({ _id: new ObjectId(productId) });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});