const express = require('express')
const route = require("express").Router()
const proker_control = require("../../controller/admin/proker")
const bodyparser = require("body-parser")
const upload = require("express-fileupload")

const app = express()
var jsonParser = bodyparser.json();
app.use(jsonParser);
app.use(upload());
var urlencodedParser = bodyparser.urlencoded({ extended: false })

route.post('/add_proker', urlencodedParser, proker_control.addproker)
route.post('/edit_proker', urlencodedParser, proker_control.editProker)
route.get('/edit', proker_control.formEditProker)
route.get('/hapus', proker_control.hapusProker)
route.get('/add_proker', proker_control.formproker)
route.get('/', proker_control.proker)

module.exports = route