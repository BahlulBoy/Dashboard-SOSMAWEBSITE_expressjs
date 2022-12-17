const database = require("../../config/database_config");
const fs = require("fs");

module.exports = {
    user(req, res){
        database.getConnection((err, connection) => {
            connection.query('SELECT * FROM user', function (err, result, field) {
              if (err) throw err;
              res.render('user', {database : result, status : req.flash('status')});
              connection.release();
            })
        })
    },
    formuser(req, res){
        res.render("./add_page/user", {layout: "./layout/errorlayout"});
    },
    formEditUser(req, res){
        database.getConnection((err, connection) => {
            connection.query('SELECT * FROM `user` WHERE `user`.`nama`=' + "'" + req.query.id + "'", function (err, result, field) {
              if (err) throw err;
              res.render('./update_page/user', {database : result, layout: "./layout/errorlayout"});
              connection.release();
            })
        })
    },
    adduser(req, res){
    const { image } = req.files;
    var nama = (req.body.nama).toString();
    var username = (req.body.username).toString();
    var email = (req.body.email);
    var password = (req.body.password).toString();
    var profile = image.name;
    database.getConnection((err, connection) => {
        connection.query("INSERT INTO `user` (`nama`, `username`, `email`, `password`, `foto_user`) VALUES " + "("  + "'"+ nama +"'" + ", " + "'"+ username +"'" + ", " + "'"+ email +"'" + ", " + "MD5(" + "'"+ password +"'" + ")" + ", " + "'"+ profile +"'" +")" , function (err, result, field) {      
            if (err) {
                req.flash('status', err.name)
                res.redirect('/admin/user')
            };
            image.mv(process.cwd() + "/public/img/profile/" + profile);
            req.flash('status', 'user telah diedit')
            res.redirect("/admin/user");
            connection.release();
        })
    })
    },
    hapusUser(req, res){
        if (!req.query.status) {
            res.send(`<script>if (confirm(\"apakah kamu ingin menghapus data ini?\\n(${req.query.id})\")) {
                window.location.href=\"/admin/user/hapus?id=${req.query.id}&status=benar\";
            }
            else {
                window.location.href=\"/admin/user\";
            }</script>`)
        } else if (req.query.status) {
            database.getConnection((err, connection) => {
                connection.query('SELECT * FROM `user` WHERE `user`.`nama`=' + "'" + req.query.id + "'", function (err, result, field) {
                    fs.unlinkSync(process.cwd() + "/public/img/profile/" + result[0].foto_user)
                    connection.release()
                })
            })
            database.getConnection((err, connection) => {
                connection.query('DELETE FROM `user` WHERE `user`.`nama`=' + "'" + req.query.id + "'", function (err, result, field) {
                  if (err) {
                    req.flash('status', err.message)
                    res.redirect('/admin/user')
                  } else {
                    req.flash('status', 'database telah dihapus')
                    res.redirect('/admin/user')
                    connection.release();
                  };
                })
            })
        } else {
            res.redirect('/admin/proker');
        }
    },
    settingUser(req, res){
        var id = (req.body.id).toString();
        var nama = (req.body.nama).toString();
        var username = (req.body.username).toString();
        var email = (req.body.email);
        var password = (req.body.password).toString();
        if (req.files) {
            database.getConnection((err, connection) => {
                connection.query('SELECT * FROM `user` WHERE `user`.`nama`=' + "'" + id + "'", function (err, result, field) {
                    fs.unlinkSync(process.cwd() + "/public/img/profile/" + result[0].foto_user)
                    connection.release()
                })
            })
            const { image } = req.files;
            var profile = image.name;
            database.getConnection((err, connection) => {
                connection.query("UPDATE `user` SET `nama` =" + "'" + nama + "'," + "`username` =" + "'" + username + "'," + "`email` = " + "'" + email + "'," + " `password` = MD5(" + "'" + password + "'" + ")" + "," + "`foto_user` = " + "'" + profile + "'" + " WHERE `user`.`nama` = " + "'" + id + "'", function (err, result, field) {
                    try {
                        image.mv(process.cwd() + "/public/img/profile/" + profile);
                        req.flash('status', 'user telah ditambahkan')
                        res.redirect("/admin/user");
                        connection.release();
                    } catch (err) {
                        req.flash('status', err.name)
                        res.redirect('/admin/user')
                    }
                })
            })
        } else {
            database.getConnection((err, connection) => {
                connection.query("UPDATE `user` SET `nama` =" + "'" + nama + "'," + "`username` =" + "'" + username + "'," + "`email` = " + "'" + email + "'," + " `password` = MD5(" + "'" + password + "'" + ") WHERE `user`.`nama` = " + "'" + id + "'", function (err, result, field) {
                    if (err) {
                        console.log(err);
                        req.flash('status', err.message)
                        res.redirect('/admin/user')
                    } else {
                        req.flash('status', 'user telah diedit')
                        res.redirect("/admin/user");
                        connection.release();
                    };
                })
            })
        }
    },
}