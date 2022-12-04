const express = require('express');
const layout_ejs = require("express-ejs-layouts");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const con = require("./database_connect");
const port = 5000;

const app = express();
var jsonParser = bodyparser.json()
app.use(layout_ejs);
app.use(express.static('public'));
app.use(jsonParser);

app.set('view engine', 'ejs');
app.set('layout', './layout/layout');
var urlencodedParser = bodyparser.urlencoded({ extended: false })

const pool = mysql.createPool({
    host        : 'localhost',
    user        : 'root',
    password    : '',
    database    : 'web_organisasi',
  });

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

app.get('/add', (req, res) => {
    var page = req.query.page;
    switch (page) {
        case "anggota":
            res.render("./add_page/anggota", {layout: "./layout/errorlayout"});
            break;
        case "berita":
            res.render("./add_page/berita", {layout: "./layout/errorlayout"});
            break;
        case "periode":
            res.render("./add_page/periode", {layout: "./layout/errorlayout"});
            break
        case "proker":
            res.render("./add_page/proker", {layout: "./layout/errorlayout"});
            break
        case "user":
            res.render("./add_page/user", {layout: "./layout/errorlayout"});
            break
        default:
            break;
    }
})

app.post('/add_user', urlencodedParser, (req, res) => {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var b = req.body.tanggal_lahir;
    var tanggal_lahir = b.split("-").reverse().join("-");
    var prodi = req.body.prodi;
    var periode = req.body.periode;
    var jabatan = req.body.jabatan;
})

app.use('/', (req, res) => {
    res.render('error', { layout : "./layout/errorlayout" });
})
// routing


app.listen(port, () => {
    console.log(`localhost:${port}`);
})