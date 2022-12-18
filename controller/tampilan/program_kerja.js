const database = require("../../config/database_config")

module.exports = {
    programkerja(req, res){
        database.getConnection((err, connection) => {
            let pendidikan = [];
            let pengabdian = [];
            function grow(b, r) {
                b.push(r)
            }
            connection.query('SELECT * FROM proker WHERE bidang="Pengabdian"', function (err, result, field) {
                if (err) throw err;
                grow(pengabdian, result)
              })
            connection.query('SELECT * FROM proker WHERE bidang="Pendidikan"', function (err, result, field) {
              if (err) throw err;
              grow(pendidikan, result)
              connection.release();
              res.render('./tampilan/program kerja', {pendidikan : pendidikan[0], pengabdian: pengabdian[0], layout: "./layout/main"})
            })
        })
    }
}