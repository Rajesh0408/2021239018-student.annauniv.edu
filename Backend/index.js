// server.js File
const express = require('express'); // Importing express module

const app = express(); // Creating an express object
app.use(express.json());
    // Middleware to parse URL-encoded request bodies (for form data)
app.use(express.urlencoded({ extended: true }));

const port = 8000;  // Setting an port for this application

const products = [
  {
    id: '1',
    name: 'Laptop Pro X',
    category: 'Electronics',
    price: 1200.00
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 150.00
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    category: 'Furniture',
    price: 350.00
  },
  {
    id: '4',
    name: 'Coffee Maker Deluxe',
    category: 'Home Appliances',
    price: 80.50
  },
  {
    id: '5',
    name: 'JavaScript Definitive Guide',
    category: 'Books',
    price: 45.99
  }
];


app.get('/', function (req, res) {
  res.send('Server is working');
})

app.get('/products', function (req, res) {
    res.status(200).send(products);
  
})

app.get('/products/:id', function (req, res) {
    try {
        const searchId = req.params.id.toString()
        let foundObject = null;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == searchId) {
                foundObject = products[i];
                console.log(foundObject)
                break; // Exit the loop once the object is found
            }
        }
        res.status(200).send(foundObject);
    } catch(err){
        res.status(400).send(err);
    }
   
  
})

app.post('/products', (req, res) => {
 try{

    console.log(req.body);
    // Extract the four attributes from the request body
    const {  name,
        category,
        price } = req.body;

    // Validate if all attributes are present
    if (!name || !category || !price ) {
        return res.status(400).json({ message: 'All attributes(name, category, price) are required.' });
    }

    // Create a new item object
    const newItem = {
        "id": products.length + 1, // Simple ID generation
        "name": name,
        "category": category,
        "price": price
    };

    // Add the new item to the array
    products.push(newItem);

    // Respond with the newly created item
    res.status(201).json(newItem);

   } catch(err){
        res.status(400).send(err);
    }
});


// Starting server using listen function
app.listen(port, function (err) {
   if(err){
       console.log("Error while starting server");
   }
   else{
       console.log("Server has been started at "+port);
   }
})


//sand box to dev box