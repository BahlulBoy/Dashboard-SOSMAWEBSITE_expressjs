const express = require('express');
const app = express();
const layout_ejs = require("express-ejs-layouts");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const con = require("./database_connect");
const port = 5000;


app.use(layout_ejs);
app.use(express.static('public'));

var jsonParser = bodyparser.json()
app.set('view engine', 'ejs');
app.set('layout', './layout/layout');
var urlencodedParser = bodyparser.urlencoded({ extended: false })


// routing
app.get('/profile', (req, res) => {
    res.render('profile');
})
app.get('/anggota', (req, res) => {
    con.connect('anggota', res, 'SELECT *, nama_periode FROM anggota INNER JOIN periode ON anggota.periode = periode.id_periode');
})
app.get('/berita', (req, res) => {
    con.connect('berita', res, 'SELECT *, nama FROM berita INNER JOIN anggota ON berita.penulis = anggota.nim');
})
app.get('/periode', (req, res) => {
    con.connect('periode', res, 'SELECT * FROM periode');
})
app.get('/proker', (req, res) => {
    con.connect('proker', res, 'SELECT *, nama, nama_periode FROM proker INNER JOIN anggota ON proker.penanggungjawab = anggota.nim INNER JOIN periode ON proker.periode = periode.id_periode');
})
app.get('/user', (req, res) => {
    con.connect('user', res, 'SELECT * FROM user');
})


app.use('/', (req, res) => {
    res.render('error', { layout : "./layout/errorlayout" });
})
// routing


app.listen(port, () => {
    console.log(`localhost:${port}`);
})