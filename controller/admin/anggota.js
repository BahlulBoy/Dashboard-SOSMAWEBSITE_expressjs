const database = require("../../config/database_config");
const fs = require("fs");

module.exports = {
    anggota(req, res){
        database.getConnection((err, connection) => {
            connection.query('SELECT *, tahun FROM anggota INNER JOIN periode ON anggota.periode = periode.id_periode', function (err, result, field) {
                try {
                    res.render('anggota', {database : result, status : req.flash('status')});
                    connection.release();
                } catch (error) {
                    req.flash('status', err.message)
                    res.redirect('/admin/anggota')
                }
            })
        })
    },
    addAnggota(req, res){
            database.getConnection((err, connection) => {
            connection.query("SELECT nama_periode, tahun FROM periode", function (err, result, field) {
                try {
                    res.render("./add_page/anggota", {database : result, layout: "./layout/errorlayout"});
                    connection.release();
                } catch (error) {
                    req.flash('status', err.message)
                    res.redirect('/admin/anggota')
                }
            })
        })
    },
    formAnggota(req, res) {
        var { image } = req.files;
        var foto = image.name
        var nim = (req.body.nim).toString();
        var nama = (req.body.nama).toString();
        var tanggal = (req.body.tanggal).toString();
        var bulan = (req.body.bulan).toString();
        var tahun = (req.body.tahun).toString();
        var tanggal_lahir = (tanggal + ' ' + bulan + ' ' + tahun);
        var prodi = (req.body.prodi).toString();
        var periode = (req.body.periode).toString();
        var jabatan = (req.body.jabatan).toString();
        var nama_jabatan = (req.body.nama_jabatan).toString();
        var data = database.getConnection((err, connection) => {
            connection.query("INSERT INTO `anggota` (`nim`, `nama`, `tanggal_lahir`, `prodi`, `periode`, `jabatan`, `nama_jabatan`, `foto`) VALUES " + "("  + "'"+ nim +"'" + ", " + "'"+ nama +"'" + ", " + "'"+ tanggal_lahir +"'" + ", " + "'"+ prodi +"'" + ", " + "(SELECT id_periode FROM periode WHERE nama_periode="+ "'" + periode + "'" + ")" + ", " + "'"+ jabatan +"'" + ", " + "'"+ nama_jabatan +"'" + ", " + "'"+ foto +"'" +")" , function (err, result, field) {  
                try {
                    image.mv( process.cwd() + "/public/img/foto anggota/" + foto)
                    req.flash('status', 'database berhasil di buat');
                    res.redirect("/admin/anggota");
                    connection.release();
                } catch (err) {
                    req.flash('status', err.name)
                    res.redirect('/admin/anggota')
                }
            })
        })
    },
    hapusAnggota(req, res){
        console.log(req.query.id);
        if (!req.query.status) {
            res.send(`<script>if (confirm(\"apakah kamu ingin menghapus data ini?\\n(${req.query.id})\")) {
                window.location.href=\"/admin/anggota/hapus?id=${req.query.id}&status=benar\";
            }
            else {
                window.location.href=\"/admin/anggota\";
            }</script>`)
        } else if (req.query.status) {
            database.getConnection((err, connection) => {
                connection.query('SELECT * FROM `anggota` WHERE `anggota`.`nama`=' + "'" + req.query.id + "'", function (err, result, field) {
                    try {
                        fs.unlinkSync(process.cwd() + "/public/img/foto anggota/" + result[0].foto)
                        connection.release()
                    } catch (err) {
                        req.flash('status', err.message)
                        res.redirect('/admin/anggota')
                    }
                })
            })
            database.getConnection((err, connection) => {
                connection.query('DELETE FROM `anggota` WHERE `anggota`.`nama`=' + "'" + req.query.id + "'", function (err, result, field) {
                    try {
                        req.flash('status', 'database telah dihapus')
                        res.redirect('/admin/anggota')
                        connection.release();                        
                    } catch (err) {
                        req.flash('status', err.message)
                        res.redirect('/admin/anggota')
                    }
                })
            })
        } else {
            res.redirect('/admin/anggota');
        }
    },
    formEditAnggota(req, res){
        database.getConnection((err, connection) => {
            let b = [];
            function nomer(f) {
                b.push(f)
            }
            connection.query("SELECT * FROM periode", function (err, result, field) {
                if (err) throw err;
                nomer(result)
            })
            connection.query('SELECT * FROM `anggota` WHERE `anggota`.`nama`=' + "'" + req.query.id + "'", function (err, result, field) {
              if (err) throw err;
              res.render('./update_page/anggota', {database : result, d : b[0], id : req.query.id, layout: "./layout/errorlayout"});
              connection.release();
            })
        })
    },
    settingAnggota(req, res){
        var id = (req.body.id).toString();
        var nim = (req.body.nim).toString();
        var nama = (req.body.nama).toString();
        var tanggal = (req.body.tanggal).toString();
        var bulan = (req.body.bulan).toString();
        var tahun = (req.body.tahun).toString();
        var tanggal_lahir = (tanggal + ' ' + bulan + ' ' + tahun);
        var prodi = (req.body.prodi).toString();
        var periode = (req.body.periode).toString();
        var jabatan = (req.body.jabatan).toString();
        var nama_jabatan = (req.body.nama_jabatan).toString()
        if (req.files) {
            const { image } = req.files;
            var profile = image.name;
            database.getConnection((err, connection) => {
                connection.query("SELECT * FROM `anggota` WHERE `anggota`.`nama`='" + id + "'", function (err, result, field) {
                    console.log(result);
                    fs.unlinkSync(process.cwd() + "/public/img/foto anggota/" + result[0].foto)
                    connection.release()
                })
            })
            database.getConnection((err, connection) => {
                connection.query("UPDATE `anggota` SET `nim` = " + "'" + nim + "'" + ", `nama` = " + "'" + nama + "'" + ", `tanggal_lahir` = " + "'" + tanggal_lahir + "'" + ", `periode` = "+"'"+periode+"'"+", `jabatan` = "+"'"+jabatan+"'"+", `nama_jabatan` = "+"'"+nama_jabatan+"'"+", `foto` = "+"'"+profile+"'"+" WHERE `anggota`.`nama` = "+"'"+id+"'", function (err, result, field) {
                    try {
                        image.mv(process.cwd() + "/public/img/foto anggota/" + profile);
                        req.flash('status', 'user telah ditambahkan')
                        res.redirect("/admin/anggota");
                        connection.release();
                    } catch (err) {
                        req.flash('status', err.name)
                        res.redirect('/admin/anggota')
                    }
                })
            })
        } else {
            database.getConnection((err, connection) => {
                connection.query("UPDATE `anggota` SET `nim` = " + "'" + nim + "'" + ", `nama` = " + "'" + nama + "'" + ", `tanggal_lahir` = " + "'" + tanggal_lahir + "'" + ", `periode` = "+"'"+periode+"'"+", `jabatan` = "+"'"+jabatan+"'"+", `nama_jabatan` = "+"'"+nama_jabatan+"'" + " WHERE `anggota`.`nama` = "+"'"+id+"'", function (err, result, field) {
                    try {
                        req.flash('status', 'user telah ditambahkan')
                        res.redirect("/admin/anggota");
                        connection.release();
                    } catch (err) {
                        req.flash('status', err.name)
                        res.redirect('/admin/anggota')
                    }
                })
            })
        }
    },
}