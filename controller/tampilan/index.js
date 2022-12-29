const database = require("../../config/database_config")

module.exports = {
    index(req, res){
        database.getConnection((err, connection) => {
            var b = [];
            var c = [];
            connection.query('SELECT * FROM proker', function (err, result, field) {
                if (err) throw err;
                b.push(result);
            })
            connection.query('SELECT * FROM anggota', function (err, result, field) {
              if (err) throw err;
              c.push(result);
            })
            connection.query("SELECT * FROM anggota WHERE jabatan='Mentri' OR jabatan='Dirjen'", function (err, result, field) {
              if (err) throw err;
              connection.release();
              res.render('./tampilan/index', {database : result, data :b[0], anggota : c[0], layout: "./layout/main"})
            })
        })
    }
}