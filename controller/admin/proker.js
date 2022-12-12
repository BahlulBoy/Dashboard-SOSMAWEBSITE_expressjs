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
    },
    formproker(req, res){
        var data = database.getConnection((err, connection) => {
            connection.query("SELECT nama_periode FROM periode", function (err, result, field) {
              if (err) throw err;
              res.render("./add_page/proker", {database : result, layout: "./layout/errorlayout"});
              connection.release();
            })
        })
    },
    addproker(req, res){
        const { image } = req.files;
        var nama_proker = (req.body.nama_proker).toString();
        var tanggal_proker = (req.body.tanggal).toString();
        var lokasi = (req.body.lokasi_proker);
        var deskripsi = (req.body.deskripsi).toString();
        var penanggung_jawab = (req.body.penanggung_jawab).toString();
        var foto_dokumentasi = image.name;
        var periode = (req.body.periode).toString();
        var data = database.getConnection((err, connection) => {
            connection.query("INSERT INTO `proker` (`nama_proker`, `tanggal`, `lokasi`, `deskripsi`, `penanggungjawab`, `dokumentasi` , `periode`) VALUES " + "("  + "'"+ nama_proker +"'" + ", " + "'"+ tanggal_proker +"'" + ", " + "'"+ lokasi +"'" + ", " + "'"+ deskripsi +"'" + ", " + "(SELECT nim FROM anggota WHERE nama="+ "'" + penanggung_jawab + "'" + ")" + ", " + "'" + foto_dokumentasi + "'" +  ", " + "(SELECT id_periode FROM periode WHERE nama_periode="+ "'" + periode + "'" + ")" + ")" , function (err, result, field) {      
                if (err) throw err;      
                image.mv( process.cwd() + "/public/img/dokumentasi/" + foto_dokumentasi);
                res.redirect("/admin/proker");
                connection.release();    
            })
        })
    }
}