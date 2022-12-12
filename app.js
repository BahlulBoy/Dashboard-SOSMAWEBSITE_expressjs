const express = require('express');
const layout_ejs = require('express-ejs-layouts');
const mysql = require("mysql");
const upload = require("express-fileupload");
const bodyparser = require("body-parser");
const con = require("./database_connect");
const port = 5000;

const app = express();
var jsonParser = bodyparser.json();
app.use(layout_ejs);
app.use(express.static('public'));
app.use(jsonParser);
app.use(upload());

app.set('view engine', 'ejs');
app.set('layout', './layout/layout');
var urlencodedParser = bodyparser.urlencoded({ extended: false });

const pool = mysql.createPool({
    host        : 'localhost',
    user        : 'root',
    password    : '',
    database    : 'web_organisasi',
  });

app.use('/admin', (req, res, next) => {
    if (true) {
        next();
        return;
    } else {
        res.redirect('/berita')
    }
}, require('./route/admin/admin'));
app.use('/', (req, res) => {
    res.render('error', { layout : "./layout/errorlayout" });
})
// routing


app.listen(port, () => {
    console.log(`localhost:${port}`);
})