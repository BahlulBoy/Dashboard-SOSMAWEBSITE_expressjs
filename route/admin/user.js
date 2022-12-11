const route = require("express").Router()
const user_control = require('../../controller/admin/user')

route.get('/', user_control.user)

module.exports = route