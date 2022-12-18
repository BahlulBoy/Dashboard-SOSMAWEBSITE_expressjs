const database = require("../../config/database_config")

module.exports = {
    mentri(req, res){
        database.getConnection((err, connection) => {
            connection.query("SELECT nama, nama_jabatan, foto FROM anggota WHERE jabatan='Mentri'", function (err, result, field) {
              if (err) throw err;
              res.render('./tampilan/mentri', {database : result, layout: "./layout/main"})
              connection.release();
            })
        })
    }
}