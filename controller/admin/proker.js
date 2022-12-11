const database = require("../../config/database_config")

module.exports = {
    proker(req, res){
        database.getConnection((err, connection) => {
            connection.query('SELECT *, nama, nama_periode FROM proker INNER JOIN anggota ON proker.penanggungjawab = anggota.nim INNER JOIN periode ON proker.periode = periode.id_periode', function (err, result, field) {
              if (err) throw err;
              res.render('proker', {database : result});
              connection.release();
            })
        })
    }
}