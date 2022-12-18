const database = require("../../config/database_config");

module.exports = {
    profile(req, res){
        database.getConnection((err, connection) => {
            connection.query('SELECT * FROM user WHERE username=' + "'" + req.session.username + "'", function (err, result, field) {
                res.render('profile', {database : result});
                connection.release()
            })
        })
    },
}