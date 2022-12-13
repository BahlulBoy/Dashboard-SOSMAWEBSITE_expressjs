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
        var penulis = req.body.penulis;
        var data = database.getConnection((err, connection) => {
            connection.query("INSERT INTO `berita` (`judul_berita`, `isi_berita`, `penulis`) VALUES " + "("  + "'"+ judul_berita +"'" + ", "  + "'"+ isi_berita +"'" + ", " + "(SELECT nim FROM anggota WHERE nama="+ "'" + penulis + "'" + ")" +")" , function (err, result, field) {      
                if (err) {
                    req.flash('status', err.name)
                    res.redirect("/admin/berita?status=error");
                };
                req.flash('status', 'database telah ditambahkan')
                res.redirect("/admin/berita");
                connection.release();
            })
        })
    }
}