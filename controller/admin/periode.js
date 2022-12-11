const database = require("../../config/database_config");

module.exports = {
    periode(req, res){
        database.getConnection((err, connection) => {
            connection.query('SELECT * FROM periode', function (err, result, field) {
              if (err) throw err;
              res.render('periode', {database : result});
              connection.release();
            })
        })
    }
}