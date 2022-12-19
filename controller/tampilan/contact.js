const database = require("../../config/database_config")

module.exports = {
    contact(req, res){
        res.render('./tampilan/contact', {layout: "./layout/main"})
    },
    addcontact(req, res){
        var nama = req.body.nama;
        var email = req.body.email;
        var judul = req.body.judul;
        var isi = req.body.isi;
        if (nama && email && judul && isi) {
            var data = database.getConnection((err, connection) => {
                connection.query("INSERT INTO `contact` (`id`, `nama`, `email`, `judul`, `isi`) VALUES " + "("  + "NULL" + ", "  + "'"+ nama +"'" + ", " + "'"+ email +"'" + ", " + "'"+ judul +"'" + ", " + "'"+ isi +"'" +")" , function (err, result, field) {
                    if (err) {
                        res.send(err)
                    } else {
                        res.redirect("/contact");
                    };
                    connection.release();
                })
            })
        } else {
            res.redirect("/contact");
        }
    }
}