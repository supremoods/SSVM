const db = require('../db/conn').db;
const paymongo = require('paymongo-node')('');
// const paymongo = require('paymongo-node')('');
const { promisify } = require('util');

const paymentCheckout = (product) => {
  console.log('product');
  console.log(product);

  console.log(product.amount);
  const total = `?total=${product.amount}`
  const ballpen = `&ballpen=${product.ballpen.name}&ballpenQuantity=${product.ballpen.quantity}&ballpenPrice=${product.ballpen.price}&ballpenDate=${product.ballpen.date}&ballpenReference=${product.ballpen.reference}`
  const marker = `&marker=${product.marker.name}&markerQuantity=${product.marker.quantity}&markerPrice=${product.marker.price}&markerDate=${product.marker.date}&markerReference=${product.marker.reference}`

  console.log(total + ballpen + marker);

  return new Promise((resolve, reject) => {
    paymongo.sources.create({
      amount: product.amount * 100,
      livemode: false,
      currency: "PHP",
      type: "gcash",
      payment_method_allowed: ["gcash"],
      redirect: {
        success: `http://localhost:3000/Dispense?${total + ballpen + marker}`,
        failed: "http://localhost:3000/Fail",
      }
    }).then((resource) => {
      console.log(resource.redirect.checkout_url);
      resolve(resource.redirect.checkout_url);
    }).catch((error) => {
      console.log(error);
      reject(error);
    });
  });
}

const insertSales = async (sale) => {
  console.log('insertSales');
  console.log(sale.description);

  try {
    const query = promisify(db.query.bind(db));
    const result = await query(
      'INSERT INTO sales (description, quantity, price, total, date, reference) VALUES (?, ?, ?, ?, ?, ?)',
      [sale.description, sale.quantity, sale.price, sale.total, sale.date, sale.reference]
    );
    return result.affectedRows === 1;
  } catch (error) {
    console.log(error);
    return false;
  }
}

const getSales = async () => {
  try {
    const query = promisify(db.query.bind(db));
    const result = await query('SELECT * FROM sales');
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  insertSales,
  getSales,
  paymentCheckout
};
