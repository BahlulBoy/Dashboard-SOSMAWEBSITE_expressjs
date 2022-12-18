const route = require("express").Router();
const proker_control = require("../../controller/tampilan/program_kerja");

route.get('/', proker_control.programkerja);

module.exports = route;