const express = require('express')
const route = require("express").Router()
const bodyparser = require("body-parser")
const anggota_controller = require("../../controller/admin/anggota")
const fs = require("fs");
const upload = require("express-fileupload")

const app = express()
var jsonParser = bodyparser.json()
app.use(jsonParser)
app.use(upload())
var urlencodedParser = bodyparser.urlencoded({ extended: false })

route.post('/add_anggota', urlencodedParser, anggota_controller.formAnggota)
route.post('/edit_anggota', urlencodedParser, anggota_controller.settingAnggota)
route.get('/edit_anggota', anggota_controller.formEditAnggota)
route.get('/hapus', anggota_controller.hapusAnggota)
route.get('/add_anggota', anggota_controller.addAnggota)
route.get('/', anggota_controller.anggota)

module.exports = route;