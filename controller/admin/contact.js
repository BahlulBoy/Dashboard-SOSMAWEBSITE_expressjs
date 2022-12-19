const database = require("../../config/database_config")

module.exports = {
    contact(req, res){
        database.getConnection((err, connection) => {
            connection.query("SELECT * FROM contact", function (err, result, field) {
              if (err) throw err;
              res.render('./contact', {database : result})
              connection.release();
            })
        })
    },
    hapus(req, res){
        var id = req.query.id;
        database.getConnection((err, connection) => {
            connection.query("DELETE FROM contact WHERE contact.id=" + id, function (err, result, field) {
              if (err) throw err;
              res.redirect('/admin/contact')
              connection.release();
            })
        })
    }
}