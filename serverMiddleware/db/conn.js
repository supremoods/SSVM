const mysql = require('mysql2');
const db = mysql.createConnection({
  
  host: 'localhost',
  user: 'root',
  database: 'ssvm',
  // password:'ssvm2023'
  password:''

});



const isConnected = () => {
    return new Promise((resolve, reject) => {
      db.connect((err) => {
          if (err) {
            resolve(false); // Connection failed
          } else {
            resolve(true); // Connection successful
          }
        });
      });
}

module.exports = {db, isConnected}
