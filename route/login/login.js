const express = require("express")
const router = require('express').Router();
const login_controller = require("../../controller/login/login")
const bodyparser = require("body-parser");

const app = express()
var jsonParser = bodyparser.json()
app.use(jsonParser)
var urlencodedParser = bodyparser.urlencoded({ extended: false })

router.post('/auth', urlencodedParser, login_controller.loginauth);
router.get('/', login_controller.login);

module.exports = router