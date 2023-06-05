const express = require('express');
const app = express();
const db = require('../db/conn');
const Stocks = require('../model/stocks').Stocks;
const Sales = require('../model/sales').Sales;
const StocksController = require('../controller/stocks');
const SalesController = require('../controller/sales');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
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





module.exports = app

