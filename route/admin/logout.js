const route = require("express").Router()
const logout = require("../../controller/admin/logout")
const bodyparser = require("body-parser");


route.get('/', logout.logout)

module.exports = route;