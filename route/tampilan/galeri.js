const route = require("express").Router();
const galeri_control = require("../../controller/tampilan/galeri");

route.get('/', galeri_control.programkerja);

module.exports = route;