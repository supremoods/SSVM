const db = require('../db/conn').db;

const insertSales = (sale) => {
    console.log('insertSales');
    console.log(sale.description);
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO sales (
            description, 
            quantity, 
            price, 
            total, 
            date, 
            reference) VALUES (
                '${sale.description}', 
                '${sale.quantity}', 
                '${sale.price}',
                '${sale.total}',
                '${sale.date}',
                '${sale.reference}')
                `, (err) => {
            if (err) {
                resolve(false); // Connection failed
              } else {
                resolve(true); // Connection successful
              }
        });
    });
}

const getSales = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM sales `, (err, result) => {
            if (err) {
                reject(err); // Connection failed
            } else {
                resolve(result); // Connection successful
            }
        });
    });
}

module.exports = {
    insertSales,
    getSales
}