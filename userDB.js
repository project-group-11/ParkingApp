const credentials = require('./credentials.js');
const mysql = require('mysql');

/**
 * Database Connection Info
 */
const db = mysql.createPool({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.servername,
});

/**
 * Parking User Table Info
 */
const table = {
  name: 'parkingUsers',
  labels: ['id', 'token', 'username', 'img_url', 'official'],
  createString: `CREATE TABLE parkingUsers (
  id INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  img_url VARCHAR(255) DEFAULT NULL,
  official BOOLEAN NOT NULL DEFAULT '0',
  distance INT NOT NULL DEFAULT '10',
  time INT NOT NULL DEFAULT '15')`,
};

/**
 * Add an Account
 * @param {Object} account - new account object
 * @param {Function} callback
 */
const addAccount = (account, callback) => {
  const labels = table.labels;
  if(labels[0] === 'id') labels.shift(); // remove id field
  db.query(
      `INSERT INTO ${table.name}(`
    + labels.toString()
    + ') VALUES (?, ?, ?, ?)', // table-specific
      [account.token,
        account.username,
        account.img_url,
        account.official],
      (err, result) => {
        if (err) {
          callback(err);
          return;
        }
        getLastRow(callback);
      });
};

/**
 * Helper for Updating Account Information
 * @param {Object} accountUpdate - updated row info
 * @param {Array} selectResult - previous row info
 * @param {Function} callback
 */
const updateAccountHelper = (accountUpdate, selectResult, callback) => {
  const curVals = selectResult[0];
  db.query(
      `UPDATE ${table.name} SET username=?, img_url=?, WHERE token=? `,
      [accountUpdate.username || curVals.username,
        accountUpdate.img_url || curVals.img_url,
        curVals.token],
      callback);
};

/**
 * Delete an Account
 * @param {String/Number} token
 * @param {Function} callback
 */
const deleteAccount = (token, callback) => {
  db.query(
      `DELETE FROM ${table.name}`
    +' WHERE token = ?',
      token,
      callback);
};

/**
 * Update Account
 * @param {Object} accountUpdate - updated account info
 * @param {Function} callback
 */
const updateAccount = (accountUpdate, callback) => {
  selectAccount(accountUpdate.token,
    (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      if (result.length == 1) updateAccountHelper(accountUpdate, result, callback);
    });
};

/**
 * Select account by id token
 * @param {String/Number} token - account's id token
 * @param {Function} callback
 */
const selectAccount = (token, callback) => {
  db.query('SELECT *'
    +` FROM ${table.name}`
    +' WHERE token=?',
  [token],
  callback);
};

/**
 * Select account by id token
 * @param {String/Number} token - account's id token
 * @param {Function} callback
 */
const isOfficial = (token) => {
  try {
    db.query('SELECT *'
      +` FROM ${table.name}`
      +' WHERE token=?',
    [token]);
  } catch (err) {
    return false;
  }
  return true;
};

module.exports = {
  addAccount: addAccount,
  deleteAccount: deleteAccount,
  updateAccount: updateAccount,
  isOfficial: isOfficial,
};
