const route = require("express").Router()
const proker_control = require("../../controller/admin/proker")

route.get('/', proker_control.proker)

module.exports = route