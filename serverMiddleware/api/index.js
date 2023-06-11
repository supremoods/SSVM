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

app.get('/checkSession',(req, res) => {
  // Check if user is logged in
  if (req.session.loggedIn) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.get('/checkDb', (req, res) => {
  // Dbconn
  db.isConnected().then((result) => {
    if(result) {
      res.send('Connected to the database');
    } else {
      res.send('Not connected to the database');
    }
  });
})

app.get('/insertStocks', (req, res) => {
  const stock = new Stocks('Marker', 15, 'Marker.jpg', 50 );

  StocksController.insertStocks(stock).then((result) => {
    if(result) {
      res.send('Inserted successfully');
    }else {
      res.send('Error inserting');
    }
  });
})

app.get('/getStocks', (req, res) => {
  StocksController.getStocks().then((result) => {
    if(result) {
      res.send(result);
    }else {
      res.send('Error getting');
    }
  });
})

app.get('/getProduct', (req, res) => {
  StocksController.getProduct().then((result) => {
    if(result) {
      res.send(result);
    }else {
      res.send('Error getting');
    }
  });
})

app.put('/updateStocks', (req, res) => {
  const stock = req.body.stock;
  console.log(stock);
  try {
    StocksController.updateStocks(stock).then((result) => {
      if(result.status) {
        res.send('Updated successfully');
      }else{
        res.send('Error updating');
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.put('/updateStocksQuantity', (req, res) => {
  const stock = req.body;
  console.log(stock);
  try {
    StocksController.updateStocksQuantity(stock).then((result) => {
      if(result.status) {
        res.send(true);
      }else{
        res.send(false);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.post('/insertSales', (req, res) => {
  const sales = new Sales(
    req.body.description,
    req.body.quantity,
    req.body.price,
    parseInt(req.body.price) * req.body.quantity,
    req.body.date,
    req.body.reference 
  );
  try {
    SalesController.insertSales(sales).then((result) => {
      if(result) {
        res.send(true);
      }else{
        res.send(false);
      }
    });
  }catch (error) {
    console.log(error);
  }
});

app.get('/getSales', (req, res) => {
  try {
    SalesController.getSales().then((result) => {
      if(result) {
        res.send(result);
      }else{
        res.send(false);
      }
    });
  }catch (error) {
    console.log(error);
  }
});


app.put('/updateAccount', (req, res) => {
  try{

  }catch (error){
    console.log(error);
  }
});

app.get('/insertAccount', (req, res) => {
  const password = 'ssvm2023';
  // Encrypt password using bcrypt
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      res.send('Error encrypting password');
    } else {
      try {
        AccountController.insertAccount(hash).then((result) => {
          if (result) {
            res.send('Successfully registered');
          } else {
            res.send('Unsuccessful register');
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
});

app.post('/verifyPassword', (req, res) => {
  const { password } = req.body;

  AccountController.fetchPassword().then((hashedPassword) => {
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
  });
});



module.exports = app

