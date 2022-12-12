const database = require("../../config/database_config");

module.exports = {
    user(req, res){
        database.getConnection((err, connection) => {
            connection.query('SELECT * FROM user', function (err, result, field) {
              if (err) throw err;
              res.render('user', {database : result});
              connection.release();
            })
        })
    },
    formuser(req, res){
        res.render("./add_page/user", {layout: "./layout/errorlayout"});
    },
    adduser(req, res){
    const { image } = req.files;
    var nama = (req.body.nama).toString();
    var username = (req.body.username).toString();
    var email = (req.body.email);
    var password = (req.body.password).toString();
    var profile = image.name;
    database.getConnection((err, connection) => {
        connection.query("INSERT INTO `user` (`nama`, `username`, `email`, `password`, `foto`) VALUES " + "("  + "'"+ nama +"'" + ", " + "'"+ username +"'" + ", " + "'"+ email +"'" + ", " + "MD5(" + "'"+ password +"'" + ")" + ", " + "'"+ profile +"'" +")" , function (err, result, field) {      
            if (err) throw err;
            image.mv(process.cwd() + "/public/img/profile/" + profile);
            res.redirect("/admin/user");
            connection.release();
        })
    })
    }
}