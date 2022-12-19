const route = require("express").Router();
const contact_control = require("../../controller/admin/contact");

route.get('/hapus', contact_control.hapus);
route.get('/', contact_control.contact);

module.exports = route;