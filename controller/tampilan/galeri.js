const database = require("../../config/database_config")

module.exports = {
    programkerja(req, res){
        database.getConnection((err, connection) => {
            connection.query('SELECT * FROM proker', function (err, result, field) {
              if (err) throw err;
              connection.release();
              res.render('./tampilan/galeri', {database : result, layout: "./layout/main"})
            })
        })
    }
}