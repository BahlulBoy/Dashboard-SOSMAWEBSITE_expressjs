const database = require("../../config/database_config")

module.exports = {
    dirjen(req, res){
        database.getConnection((err, connection) => {
            connection.query("SELECT nama, nama_jabatan, foto FROM anggota WHERE jabatan='Dirjen'", function (err, result, field) {
              if (err) throw err;
              res.render('./tampilan/dirjen', {database : result, layout: "./layout/main"})
              connection.release();
            })
        })
    }
}