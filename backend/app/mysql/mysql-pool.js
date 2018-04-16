const config = require("../config");
const mysql = require("promise-mysql");

module.exports = mysql.createPool(config.mysql);

// initialize database
(function init() {
  mysql
    .createConnection({
      host: config.mysql.host,
      user: config.mysql.user,
      password: config.mysql.password
    })
    .then(conn => {
      if (config.env != "test") {
        console.log("Connected to mysql");
      }

      conn.query("CREATE DATABASE IF NOT EXISTS " + config.mysql.database);
      conn.query("USE " + config.mysql.database);
      conn.query(`CREATE TABLE IF NOT EXISTS users (
        id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        password VARCHAR(60) NOT NULL,
        email VARCHAR(254) NOT NULL UNIQUE,
        activation_key VARCHAR(60),
        role VARCHAR(255) DEFAULT 'user',
        fname VARCHAR(40),
        lname VARCHAR(40),
        created BIGINT NOT NULL,
        access BIGINT,
        login BIGINT,
        disabled VARCHAR(40)
      )`);

      return conn.end();
    })
    .catch(err => {
      if (config.env != "test") {
        console.log("Failed to connect to mysql:", err.message);
      }
      setTimeout(init, 2000);
    });
})();
