const route = require("express").Router();
const berita_control = require("../../controller/tampilan/berita");

route.get('/', berita_control.berita);

module.exports = route;