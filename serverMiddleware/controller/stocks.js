
const db = require('../db/conn').db;

const insertStocks = (stock) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO stocks (name, quantity, image, price) VALUES ('${stock.name}', ${stock.quantity}, '${stock.image}', ${stock.price})`, (err) => {
            if (err) {
                resolve(false); // Connection failed
              } else {
                resolve(true); // Connection successful
              }
        });
    });
};

const getStocks = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM stocks `, (err, result) => {
            if (err) {
                reject(err); // Connection failed
            } else {
                resolve(result); // Connection successful
            }
        });
    });
};

const getProduct = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT name, image, price FROM stocks `, (err, result) => {
            if (err) {
                reject(err); // Connection failed
            } else {
                resolve(result); // Connection successful
            }
        });
    });
};

const updateStocks = (stock) => {
    // update price and quantity
    console.log('updateStocks');
    console.log(stock);
    return new Promise((resolve, reject) => {
        db.query(`UPDATE stocks SET price = ${stock.price}, quantity = ${stock.quantity} WHERE name = '${stock.name}'`, (err, result) => {
            if (err) {
                console.log(err);
                reject(err); // Connection failed
            } else {
                getStocks().then((result) => {
                    resolve({result, status: true});
                });
            }
        });
    });
};

const updateStocksQuantity = (stock) => {
    // quantity
    console.log('updateStocksQuantity');
    console.log(stock);
    return new Promise((resolve, reject) => {
        db.query(`UPDATE stocks SET quantity = ${stock.quantity} WHERE name = '${stock.name}'`, (err, result) => {
            if (err) {
                console.log(err);
                reject(err); // Connection failed
            } else {
                getStocks().then((result) => {
                    resolve({result, status: true});
                });
            }
        });
    });
};

module.exports = {
    insertStocks,
    getStocks,
    getProduct,
    updateStocks,
    updateStocksQuantity
};
