const express = require('express');
const route = require("express").Router()
const user_control = require('../../controller/admin/user')
const bodyparser = require("body-parser")
const upload = require("express-fileupload")

var jsonParser = bodyparser.json()
var urlencodedParser = bodyparser.urlencoded({ extended: false });

const app = express()
app.use(jsonParser)
app.use(upload())

route.post('/add_user', urlencodedParser, user_control.adduser)
route.post('/edit_user', user_control.settingUser)
route.get('/hapus', user_control.hapusUser)
route.get('/edit_user', user_control.formEditUser)
route.get('/add_user', user_control.formuser)
route.get('/', user_control.user)

module.exports = route