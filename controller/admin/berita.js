const database = require("../../config/database_config");

module.exports = {
    berita(req, res){
        database.getConnection((err, connection) => {
            connection.query('SELECT *, nama FROM berita INNER JOIN anggota ON berita.penulis = anggota.nim', function (err, result, field) {
              if (err) throw err;
              res.render('berita', {database : result, status: req.flash('status')});
              connection.release();
            })
        })
    },
    formberita(req, res){
        res.render("./add_page/berita", {layout: "./layout/errorlayout"});
    },
    addBerita(req, res){
        var judul_berita = req.body.judul_berita;
        var isi_berita = req.body.isi_berita;
        var tanggal = (req.body.tanggal).toString();
        var bulan = (req.body.bulan).toString();
        var tahun = (req.body.tahun).toString();
        var tanggal_berita = (tanggal + ' ' + bulan + ' ' + tahun);
        var penulis = req.body.penulis;
        var data = database.getConnection((err, connection) => {
            connection.query("INSERT INTO `berita` (`judul_berita`, `isi_berita`, `tanggal_berita`, `penulis`) VALUES " + "("  + "'"+ judul_berita +"'" + ", "  + "'"+ isi_berita +"'" + ", " + "'"+ tanggal_berita +"'" + ", " + "(SELECT nim FROM anggota WHERE nama="+ "'" + penulis + "'" + ")" +")" , function (err, result, field) {      
                if (err) {
                    req.flash('status', err.name)
                    res.redirect("/admin/berita?status=error");
                };
                req.flash('status', 'database telah ditambahkan')
                res.redirect("/admin/berita");
                connection.release();
            })
        })
    },
    hapusBerita(req, res){
        console.log(req.query.id);
        if (!req.query.status) {
            res.send(`<script>if (confirm(\"apakah kamu ingin menghapus data ini?\\n(${req.query.id})\")) {
                window.location.href=\"/admin/berita/hapus?id=${req.query.id}&status=benar\";
            }
            else {
                window.location.href=\"/admin/berita\";
            }</script>`)
        } else if (req.query.status) {
            database.getConnection((err, connection) => {
                connection.query('DELETE FROM `berita` WHERE `berita`.`judul_berita`=' + "'" + req.query.id + "'", function (err, result, field) {
                  if (err) {
                    console.log(err);
                  } else {
                    req.flash('status', 'database telah dihapus')
                    res.redirect('/admin/berita')
                    connection.release();
                  };
                })
            })
        } else {
            res.redirect('/admin/berita');
        }
    },
    settingBerita(req, res){
        var id = (req.body.id);
        var judul_berita = req.body.judul_berita;
        var isi_berita = req.body.isi_berita;
        var tanggal = (req.body.tanggal).toString();
        var bulan = (req.body.bulan).toString();
        var tahun = (req.body.tahun).toString();
        var tanggal_berita = (tanggal + ' ' + bulan + ' ' + tahun);
        var penulis = req.body.penulis;
        database.getConnection((err, connection) => {
            connection.query("UPDATE `berita` SET `judul_berita` =" + "'" + judul_berita + "'," + "`isi_berita` =" + "'" + isi_berita + "'," + "`tanggal_berita` = " + "'" + tanggal_berita + "'," + "`penulis` = " + "(SELECT nim FROM anggota WHERE nama="+ "'" + penulis + "'" + ")" + " WHERE `berita`.`id_berita` = " + "'" + id + "'", function (err, result, field) {
                if (err) {
                    console.log(err);
                    req.flash('status', err.message)
                    res.redirect('/admin/berita')
                } else {
                    req.flash('status', 'user telah diedit')
                    res.redirect("/admin/berita");
                    connection.release();
                };
            })
        })
    },
    formEditBerita(req, res){
        database.getConnection((err, connection) => {
            connection.query('SELECT *, nama FROM `berita` ' + "INNER JOIN anggota ON berita.penulis = anggota.nim" + ' WHERE `berita`.`id_berita`= ' + req.query.id, function (err, result, field) {
              if (err) throw err;
              res.render('./update_page/berita', {database : result, id:req.query.id, layout: "./layout/errorlayout"});
              connection.release();
            })
        })
    },
}