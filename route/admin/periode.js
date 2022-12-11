const route = require("express").Router();
const periode_control = require("../../controller/admin/periode");

route.get('/', periode_control.periode);

module.exports = route;