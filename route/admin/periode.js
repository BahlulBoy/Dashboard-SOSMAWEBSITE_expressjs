const route = require("express").Router();
const periode_control = require("../../controller/admin/periode");
const bodyparser = require("body-parser");

var urlencodedParser = bodyparser.urlencoded({ extended: false });

route.post('/addperiode', urlencodedParser, periode_control.addperiode)
route.post('/editperiode', urlencodedParser, periode_control.editPeriode)
route.get('/hapus', periode_control.hapusPeriode)
route.get('/edit', periode_control.formEditPeriode)
route.get('/addperiode', periode_control.periodeform)
route.get('/', periode_control.periode);

module.exports = route;