const mysql = require("mysql");
const pool = mysql.createPool({
    host        : 'localhost',
    user        : 'root',
    password    : '',
    database    : 'web_organisasi',
});  
module.exports = pool;