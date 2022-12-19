const database = require("../../config/database_config")

module.exports = {
    staffahli(req, res){
        database.getConnection((err, connection) => {
            let b = []
            connection.query("SELECT nama, nama_jabatan, foto FROM anggota WHERE jabatan='Staff Muda'", function (err, result, field) {
                if (err) throw err;
                b.push(result)
              })
            connection.query("SELECT nama, nama_jabatan, foto FROM anggota WHERE jabatan='Staff Ahli'", function (err, result, field) {
              if (err) throw err;
              res.render('./tampilan/staff ahli', {database : result, muda: b[0], layout: "./layout/main"})
              connection.release();
            })
        })
    }
}