const route = require("express").Router();
const main_control = require("../../controller/tampilan/index");

route.get('/', main_control.index);

module.exports = route;