const route = require("express").Router();
const staff_control = require("../../controller/tampilan/staff_ahli");

route.get('/', staff_control.staffahli);

module.exports = route;