const database = require("../../config/database_config");

module.exports = {
    periode(req, res){
        database.getConnection((err, connection) => {
            connection.query('SELECT * FROM periode', function (err, result, field) {
              if (err) {
                req.flash('status', err.message)
                res.redirect('/admin/periode')
              };
              res.render('periode', {database : result, status : req.flash('status')});
              connection.release();
            })
        })
    },
    periodeform(req, res){
        res.render("./add_page/periode", {layout: "./layout/errorlayout"});
    },
    addperiode(req, res){
        var tahun = req.body.tahun
        var nama_periode = req.body.nama_periode
        var data = database.getConnection((err, connection) => {
            connection.query("INSERT INTO `periode` (`tahun`, `nama_periode`) VALUES " + "("  + "'"+ tahun +"'" + ", " + "'"+ nama_periode  +"'" +")", function (err, result, field) {      
                if (err) {
                    req.flash('status', err.message)
                    res.redirect('/admin/periode')
                };
                req.flash('status', 'database berhasil dibuat')
                res.redirect("/admin/periode");
                connection.release();    
            })
        })
    },
    hapusPeriode(req, res){
        console.log(req.query.id);
        if (!req.query.status) {
            res.send(`<script>if (confirm(\"apakah kamu ingin menghapus data ini?\\n(${req.query.id})\")) {
                window.location.href=\"/admin/periode/hapus?id=${req.query.id}&status=benar\";
            }
            else {
                window.location.href=\"/admin/periode\";
            }</script>`)
        } else if (req.query.status) {
            database.getConnection((err, connection) => {
                connection.query('DELETE FROM `periode` WHERE `periode`.`nama_periode`=' + "'" + req.query.id + "'", function (err, result, field) {
                  if (err) {
                    req.flash('status', err.message)
                    res.redirect('/admin/periode')
                  } else {
                    req.flash('status', 'database telah dihapus')
                    res.redirect('/admin/periode')
                    connection.release();
                  };
                })
            })
        } else {
            res.redirect('/admin/periode');
        }
    },
    editPeriode(req, res){
        var id = (req.body.id);
        var tahun = req.body.tahun
        var nama_periode = req.body.nama_periode
        var penulis = req.body.penulis;
        database.getConnection((err, connection) => {
            connection.query("UPDATE `periode` SET `tahun` = "+"'"+tahun+"'"+", `nama_periode` = "+"'"+nama_periode+"'"+" WHERE `periode`.`id_periode` = "+id, function (err, result, field) {
                if (err) {
                    console.log(err);
                    req.flash('status', err.message)
                    res.redirect('/admin/periode')
                } else {
                    req.flash('status', 'user telah diedit')
                    res.redirect("/admin/periode");
                    connection.release();
                };
            })
        })
    },
    formEditPeriode(req, res){
        database.getConnection((err, connection) => {
            connection.query('SELECT * FROM periode WHERE `periode`.`id_periode`= ' + req.query.id, function (err, result, field) {
              if (err) throw err;
              res.render('./update_page/periode', {database : result, id:req.query.id, layout: "./layout/errorlayout"});
              connection.release();
            })
        })
    },
}