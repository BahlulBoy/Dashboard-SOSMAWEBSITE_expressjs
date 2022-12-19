const route = require("express").Router();
const contact_control = require("../../controller/tampilan/contact");
const express = require('express')
const bodyparser = require("body-parser")
const upload = require("express-fileupload")

const app = express()
var jsonParser = bodyparser.json()
app.use(jsonParser)
app.use(upload())
var urlencodedParser = bodyparser.urlencoded({ extended: false })

route.post('/add', urlencodedParser, contact_control.addcontact);
route.get('/', contact_control.contact);

module.exports = route;