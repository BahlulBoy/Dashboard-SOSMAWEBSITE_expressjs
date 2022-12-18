const route = require("express").Router();
const mentri_control = require("../../controller/tampilan/mentri");

route.get('/', mentri_control.mentri);

module.exports = route;