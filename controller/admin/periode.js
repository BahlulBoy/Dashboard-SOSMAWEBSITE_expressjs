const database = require("../../config/database_config");

module.exports = {
    periode(req, res){
        database.getConnection((err, connection) => {
            connection.query('SELECT * FROM periode', function (err, result, field) {
              if (err) {
                res.redirect('/admin/periode?status=error')
              };
              res.render('periode', {database : result});
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
                    res.redirect('/admin/periode?status=error')
                };
                res.redirect("/admin/periode");
                connection.release();    
            })
        })
    }
}