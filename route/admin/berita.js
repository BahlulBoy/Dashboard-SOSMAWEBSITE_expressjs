const route = require("express").Router()
const berita_control = require("../../controller/admin/berita")
const bodyparser = require("body-parser");

var urlencodedParser = bodyparser.urlencoded({ extended: false });

route.post('/add_berita', urlencodedParser, berita_control.addBerita)
route.post('/edit_berita', urlencodedParser, berita_control.settingBerita)
route.get('/edit', berita_control.formEditBerita)
route.get('/hapus', berita_control.hapusBerita)
route.get('/add_berita', berita_control.formberita)
route.get('/', berita_control.berita)

module.exports = route