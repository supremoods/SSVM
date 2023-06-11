const db = require('../db/conn').db;

const updateAccount = (password) => {
    // add code here ...
}

const loginAccount = (password) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM admin WHERE password = '${password}'`, (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results.length > 0) {
                    resolve(true); // Password matches, login successful
                } else {
                    resolve(false); // Password doesn't match, login failed
                }
            }
        });
    });
};

const insertAccount = (pass) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO admin (password) VALUES ('${pass}')`,
            (err) => {
                if(err){
                    resolve(false); 
                }else{
                    resolve(true);
                }
            }
        )
    })
}


const fetchPassword = () => {
    console.log('shitties')
    return new Promise((resolve, reject) => {
      db.query(`SELECT password FROM admin WHERE id = 1`, (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            resolve(results[0].password); // Return the password for id = 1
          } else {
            resolve(null); // No password found for id = 1
          }
        }
      });
    });
  };
  

module.exports = {
    insertAccount,
    updateAccount,
    loginAccount,
    fetchPassword
}