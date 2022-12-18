const database = require("../../config/database_config")

module.exports = {
    periode(req, res){
        database.getConnection((err, connection) => {
            connection.query('SELECT tahun, nama_periode FROM periode', function (err, result, field) {
              if (err) throw err;
              res.render('./tampilan/periode', {database : result, layout: "./layout/main"})
              connection.release();
            })
        })
    }
}