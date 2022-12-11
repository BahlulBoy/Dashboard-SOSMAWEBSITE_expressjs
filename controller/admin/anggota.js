const database = require("../../config/database_config");

module.exports = {
    anggota(req, res){
        database.getConnection((err, connection) => {
            connection.query('SELECT *, tahun FROM anggota INNER JOIN periode ON anggota.periode = periode.id_periode', function (err, result, field) {
              if (err) throw err;
              res.render('anggota', {database : result});
              connection.release();
            })
        })
    },
    addAnggota(req, res){
            database.getConnection((err, connection) => {
            connection.query("SELECT nama_periode FROM periode", function (err, result, field) {
              if (err) throw err;
              res.render("./add_page/anggota", {database : result, layout: "./layout/errorlayout"});
              connection.release();
            })
        })
    },
    formAnggota(req, res) {
        var nim = (req.body.nim).toString();
        var nama = (req.body.nama).toString();
        var tanggal_lahir = (req.body.tanggal_lahir);
        var prodi = (req.body.prodi).toString();
        var periode = (req.body.periode).toString();
        var jabatan = (req.body.jabatan).toString();
        var data = database.getConnection((err, connection) => {
            connection.query("INSERT INTO `anggota` (`nim`, `nama`, `tanggal_lahir`, `prodi`, `periode`, `jabatan`) VALUES " + "("  + "'"+ nim +"'" + ", " + "'"+ nama +"'" + ", " + "'"+ tanggal_lahir +"'" + ", " + "'"+ prodi +"'" + ", " + "(SELECT id_periode FROM periode WHERE nama_periode="+ "'" + periode + "'" + ")" + ", " + "'"+ jabatan +"'" +")" , function (err, result, field) {      
                if (err) throw err;      
                res.redirect("/admin/anggota");
                connection.release();    
            })
        })
    }
}