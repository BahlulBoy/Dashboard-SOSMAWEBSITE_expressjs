const route = require("express").Router();
const dirjen_control = require("../../controller/tampilan/dirjen");

route.get('/', dirjen_control.dirjen);

module.exports = route;