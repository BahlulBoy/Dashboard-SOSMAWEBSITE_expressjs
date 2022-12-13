const database = require("../../config/database_config");

module.exports = {
    periode(req, res){
        database.getConnection((err, connection) => {
            connection.query('SELECT * FROM periode', function (err, result, field) {
              if (err) {
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
                    req.flash('status', err.name)
                    res.redirect('/admin/periode')
                };
                req.flash('status', 'database berhasil dibuat')
                res.redirect("/admin/periode");
                connection.release();    
            })
        })
    }
}