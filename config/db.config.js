const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test'
});

dbConn.connect(function(err) {
    if(err) throw err;
    console.log('Connected!');
});

module.exports = dbConn;