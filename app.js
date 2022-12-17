const express = require('express')
const layout_ejs = require('express-ejs-layouts')
const mysql = require("mysql")
const upload = require("express-fileupload")
const session = require("express-session")
const bodyparser = require("body-parser")
const flash = require("connect-flash")
const port = process.env.PORT || 5000

const app = express()
var jsonParser = bodyparser.json()

app.use(session({
    secret:'Web',
    saveUninitialized: true,
    resave: true
}))

app.use(layout_ejs);
app.use(express.static('public'))
app.use(jsonParser)
app.use(flash())
app.use(upload())

app.set('view engine', 'ejs')
app.set('layout', './layout/layout')
var urlencodedParser = bodyparser.urlencoded({ extended: false })

const pool = mysql.createPool({
    host        : 'localhost',
    user        : 'root',
    password    : '',
    database    : 'web_organisasi',
  })

app.use('/admin', (req, res, next) => {
    if (true) {
        next()
        return
    } else {
        res.redirect('/berita')
    }
}, require('./route/admin/admin'));
app.use('/', 
    require('./route/tampilan/index')
)
// routing


app.listen(port, () => {
    console.log(`localhost:${port}`);
})