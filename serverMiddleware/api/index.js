const express = require('express');
const app = express();
const db = require('../db/conn');
const Stocks = require('../model/stocks').Stocks;
const Sales = require('../model/sales').Sales;
const StocksController = require('../controller/stocks');
const SalesController = require('../controller/sales');
const AccountController = require('../controller/accounts');
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');

app.use(cors());
app.use(express.json());

// Configure session middleware
app.use(session({
  secret: 'askljkjhcxiueuxkjzsd2dawsd',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  // Check if user is logged in
  res.send('You are not logged in.');
});

app.get('/dispense', (req, res) => {
  const { penCount, markerCount } = req.query;
  res.send(`pen: ${penCount} marker: ${markerCount}`);
});

app.get('/logout', (req, res) => {
  // Destroy session
  req.session.destroy((error) => {
    if (error) {
      console.log('Error destroying session:', error);
    } else {
      console.log('Session destroyed successfully');
      res.redirect('/login');
    }
  });
});

app.get('/checkSession', (req, res) => {
  // Check if user is logged in
  res.send(req.session.loggedIn ? true : false);
});

app.get('/checkDb', (req, res) => {
  // Check database connection
  db.isConnected().then((result) => {
    res.send(result ? 'Connected to the database' : 'Not connected to the database');
  });
});

app.get('/insertStocks', async (req, res) => {
  const stock = new Stocks('Marker', 15, 'Marker.jpg', 50);

  try {
    const result = await StocksController.insertStocks(stock);
    res.send(result ? 'Inserted successfully' : 'Error inserting');
  } catch (error) {
    console.log(error);
    res.send('Error inserting');
  }
});

app.get('/getStocks', async (req, res) => {
  try {
    const result = await StocksController.getStocks();
    res.send(result ? result : 'Error getting');
  } catch (error) {
    console.log(error);
    res.send('Error getting');
  }
});

app.get('/getProduct', async (req, res) => {
  try {
    const result = await StocksController.getProduct();
    res.send(result ? result : 'Error getting');
  } catch (error) {
    console.log(error);
    res.send('Error getting');
  }
});

app.put('/updateStocks', async (req, res) => {
  const stock = req.body.stock;

  try {
    const result = await StocksController.updateStocks(stock);
    res.send(result.status ? 'Updated successfully' : 'Error updating');
  } catch (error) {
    console.log(error);
    res.send('Error updating');
  }
});

app.put('/updateStocksQuantity', async (req, res) => {
  const stock = req.body;

  try {
    const result = await StocksController.updateStocksQuantity(stock);
    res.send(result.status ? true : false);
  } catch (error) {
    console.log(error);
    res.send(false);
  }
});

app.post('/insertSales', async (req, res) => {
  const sales = new Sales(
    req.body.description,
    req.body.quantity,
    req.body.price,
    parseInt(req.body.price) * req.body.quantity,
    req.body.date,
    req.body.reference
  );

  try {
    const result = await SalesController.insertSales(sales);
    res.send(result ? true : false);
  } catch (error) {
    console.log(error);
    res.send(false);
  }
});

app.get('/getSales', async (req, res) => {
  try {
    const result = await SalesController.getSales();
    res.send(result ? result : false);
  } catch (error) {
    console.log(error);
    res.send(false);
  }
});

app.put('/updateAccount', (req, res) => {
  // Add your logic for updating account here
});

app.post('/paymentCheckout', async (req, res) => {
  const { amount, ballpen, marker } = req.body;

  try {
    const result = await SalesController.paymentCheckout({ amount, ballpen, marker });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(false);
  }
});

app.get('/insertAccount', (req, res) => {
  const password = 'ssvm2023';
  // Encrypt password using bcrypt
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      console.log(err);
      res.send('Error encrypting password');
    } else {
      try {
        const result = await AccountController.insertAccount(hash);
        res.send(result ? 'Successfully registered' : 'Unsuccessful register');
      } catch (error) {
        console.log(error);
        res.send('Unsuccessful register');
      }
    }
  });
});

app.post('/verifyPassword', async (req, res) => {
  const { password } = req.body;

  try {
    const hashedPassword = await AccountController.fetchPassword();
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (result) {
        // Password matched, set session variables
        req.session.loggedIn = true;
        req.session.username = 'admin'; // Set the logged-in user's username or identifier here
        res.send(true);
      } else {
        res.send(false); // Password doesn't match, login failed
      }
    });
  } catch (error) {
    console.log(error);
    res.send(false);
  }
});

module.exports = app;
