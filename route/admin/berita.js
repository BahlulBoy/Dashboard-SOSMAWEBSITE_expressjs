const route = require("express").Router()
const berita_control = require("../../controller/admin/berita")
const bodyparser = require("body-parser");

var urlencodedParser = bodyparser.urlencoded({ extended: false });

route.post('/add_berita', urlencodedParser, berita_control.addBerita)
route.get('/add_berita', berita_control.formberita)
route.get('/', berita_control.berita)

module.exports = route