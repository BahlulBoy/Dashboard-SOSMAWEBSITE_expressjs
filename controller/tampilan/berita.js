const database = require("../../config/database_config")

module.exports = {
    berita(req, res){
        database.getConnection((err, connection) => {
            connection.query('SELECT *, nama FROM berita INNER JOIN anggota ON berita.penulis = anggota.nim', function (err, result, field) {
              if (err) throw err;
              connection.release();
              res.render('./tampilan/berita', {database : result, layout: "./layout/main"})
            })
        })
    }
}