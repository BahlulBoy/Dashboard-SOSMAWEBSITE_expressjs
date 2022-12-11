const route = require("express").Router();
const bodyparser = require("body-parser");
const anggota_controller = require("../../controller/admin/anggota");

var urlencodedParser = bodyparser.urlencoded({ extended: false });

route.post('/add_anggota', urlencodedParser, anggota_controller.formAnggota)
route.get('/add_anggota', anggota_controller.addAnggota)
route.get('/', anggota_controller.anggota)

module.exports = route;