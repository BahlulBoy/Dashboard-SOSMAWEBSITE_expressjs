const database = require("../../config/database_config")
const fs = require("fs");

module.exports = {
    proker(req, res){
        database.getConnection((err, connection) => {
            connection.query('SELECT *, nama, nama_periode FROM proker INNER JOIN anggota ON proker.penanggungjawab = anggota.nim INNER JOIN periode ON proker.periode = periode.id_periode', function (err, result, field) {
              if (err) throw err;
              res.render('proker', {database : result , status : req.flash('status')});
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
        var mtanggal = (req.body.mtanggal).toString();
        var mbulan = (req.body.mbulan).toString();
        var mtahun = (req.body.mtahun).toString();
        var stanggal = (req.body.stanggal).toString();
        var sbulan = (req.body.sbulan).toString();
        var stahun = (req.body.stahun).toString();
        var tanggal_proker = (mtanggal + ' ' + mbulan + ' ' + mtahun + " - " + stanggal + ' ' + sbulan + ' ' + stahun);
        var lokasi = (req.body.lokasi_proker);
        var deskripsi = req.body.deskripsi;
        var bidang = (req.body.bidang);
        var penanggung_jawab = req.body.penanggung_jawab;
        var foto_dokumentasi = image.name;
        var periode = (req.body.periode).toString();
        var data = database.getConnection((err, connection) => {
            connection.query("INSERT INTO `proker` (`nama_proker`, `tanggal`, `lokasi`, `deskripsi`, `bidang`, `penanggungjawab`, `dokumentasi` , `periode`) VALUES " + "("  + "'"+ nama_proker +"'" + ", " + "'"+ tanggal_proker +"'" + ", " + "'"+ lokasi +"'" + ", " + "'"+ deskripsi + "'"  + ", " + "'"+ bidang + "'"  + ", " + "(SELECT nim FROM anggota WHERE nama="+ "'" + penanggung_jawab + "'" + ")" +  ", " + "'" + foto_dokumentasi + "'" +  ", " + "(SELECT id_periode FROM periode WHERE nama_periode="+ "'" + periode + "'" + ")" + ")" , function (err, result, field) {      
                if (err) {
                    req.flash('status', err.name)
                    res.redirect('/admin/proker');
                };      
                image.mv( process.cwd() + "/public/img/dokumentasi/" + foto_dokumentasi);
                req.flash('status', 'database berhasil dibuat')
                res.redirect("/admin/proker");
                connection.release();    
            })
        })
    },
    hapusProker(req, res){
        console.log(req.query.id);
        if (!req.query.status) {
            res.send(`<script>if (confirm(\"apakah kamu ingin menghapus data ini?\\n(${req.query.id})\")) {
                window.location.href=\"/admin/proker/hapus?id=${req.query.id}&status=benar\";
            }
            else {
                window.location.href=\"/admin/proker\";
            }</script>`)
        } else if (req.query.status) {
            database.getConnection((err, connection) => {
                connection.query('SELECT * FROM `proker` WHERE `proker`.`nama_proker`=' + "'" + req.query.id + "'", function (err, result, field) {
                    fs.unlinkSync(process.cwd() + "/public/img/dokumentasi/" + result[0].dokumentasi)
                    connection.release()
                })
            })
            database.getConnection((err, connection) => {
                connection.query('DELETE FROM `proker` WHERE `proker`.`nama_proker`=' + "'" + req.query.id + "'", function (err, result, field) {
                  if (err) {
                    req.flash('status', err.message)
                    res.redirect('/admin/proker')
                  } else {
                    req.flash('status', 'database telah dihapus')
                    res.redirect('/admin/proker')
                    connection.release();
                  };
                })
            })
        } else {
            res.redirect('/admin/proker');
        }
    },
    formEditProker(req, res){
        database.getConnection((err, connection) => {
            let b = [];
            function nomer(f) {
                b.push(f)
            }
            connection.query("SELECT * FROM periode", function (err, result, field) {
                if (err) throw err;
                nomer(result)
            })
            connection.query('SELECT *, nama FROM `proker` ' + "INNER JOIN anggota ON proker.penanggungjawab = anggota.nim" + ' WHERE `proker`.`nama_proker`= ' + "'" + req.query.id + "'", function (err, result, field) {
              if (err) throw err;
              console.log('SELECT *, nama FROM `proker` ' + "INNER JOIN anggota ON proker.penanggungjawab = anggota.nim" + ' WHERE `proker`.`nama_proker`= ' + "'" + req.query.id + "'");
              res.render('./update_page/proker', {database : result, d: b[0], id : req.query.id, layout: "./layout/errorlayout"});
              connection.release();
            })
        })
    },
    editProker(req, res){
        var id = (req.body.id).toString();
        var nama_proker = (req.body.nama_proker).toString();
        var mtanggal = (req.body.mtanggal).toString();
        var mbulan = (req.body.mbulan).toString();
        var mtahun = (req.body.mtahun).toString();
        var stanggal = (req.body.stanggal).toString();
        var sbulan = (req.body.sbulan).toString();
        var stahun = (req.body.stahun).toString();
        var tanggal_proker = (mtanggal + ' ' + mbulan + ' ' + mtahun + " - " + stanggal + ' ' + sbulan + ' ' + stahun);
        var lokasi = (req.body.lokasi_proker);
        var deskripsi = req.body.deskripsi;
        var bidang = (req.body.bidang);
        var penanggung_jawab = req.body.penanggung_jawab;
        var periode = (req.body.periode).toString();
        if (req.files) {
            const { image } = req.files;
            var profile = image.name;
            database.getConnection((err, connection) => {
                connection.query("SELECT * FROM `proker` WHERE `proker`.`nama_proker`='" + id + "'", function (err, result, field) {
                    console.log(id);
                    console.log(result[0].dokumentasi);
                    fs.unlinkSync(process.cwd() + "/public/img/dokumentasi/" + result[0].dokumentasi)
                    connection.release()
                })
            })
            database.getConnection((err, connection) => {
                connection.query("UPDATE `proker` SET `nama_proker` = " + "'" + nama_proker + "'" + ", `tanggal` = " + "'" + tanggal_proker + "'" + ", `lokasi` = " + "'" + lokasi + "'" + ", `deskripsi` = "+"'"+deskripsi+"'"+", `bidang` = "+"'"+bidang+"'"+", `penanggungjawab` = "+ "(SELECT nim FROM anggota WHERE nama=" + "'" + penanggung_jawab + "'" + ")"+", `dokumentasi` = "+"'"+profile+"'" +", `periode` = "+ periode +" WHERE `proker`.`nama_proker` = "+"'"+id+"'", function (err, result, field) {
                    if (err) {
                        console.log(err);
                        req.flash('status', err.message)
                        res.redirect('/admin/proker')
                    } else {
                        image.mv( process.cwd() + "/public/img/dokumentasi/" + profile);
                        req.flash('status', 'user telah diedit')
                        res.redirect("/admin/proker");
                        connection.release();
                    }
                })
            })
        } else {
            database.getConnection((err, connection) => {
                connection.query("UPDATE `proker` SET `nama_proker` = " + "'" + nama_proker + "'" + ", `tanggal` = " + "'" + tanggal_proker + "'" + ", `lokasi` = " + "'" + lokasi + "'" + ", `deskripsi` = "+"'"+deskripsi+"'"+", `bidang` = "+"'"+bidang+"'"+", `penanggungjawab` = "+ "(SELECT nim FROM anggota WHERE nama=" + "'" + penanggung_jawab + "'" + ")"+", `periode` = "+ periode +" WHERE `proker`.`nama_proker` = "+"'"+id+"'", function (err, result, field) {
                    if (err) {
                        console.log(err);
                        req.flash('status', err.message)
                        res.redirect('/admin/proker')
                    } else {
                        req.flash('status', 'user telah diedit')
                        res.redirect("/admin/proker");
                        connection.release();                   
                    }
                })
            })
        }
    },
}