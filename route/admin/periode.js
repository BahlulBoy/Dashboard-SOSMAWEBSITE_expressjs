const route = require("express").Router();
const periode_control = require("../../controller/admin/periode");
const bodyparser = require("body-parser");

var urlencodedParser = bodyparser.urlencoded({ extended: false });

route.post('/addperiode', urlencodedParser, periode_control.addperiode)
route.get('/addperiode', periode_control.periodeform)
route.get('/', periode_control.periode);

module.exports = route;