const express = require('express');
const layout_ejs = require('express-ejs-layouts');
const mysql = require("mysql");
const bodyparser = require("body-parser");
const con = require("./database_connect");
const port = 5000;

const app = express();
var jsonParser = bodyparser.json();
app.use(layout_ejs);
app.use(express.static('public'));
app.use(jsonParser);

app.set('view engine', 'ejs');
app.set('layout', './layout/layout');
var urlencodedParser = bodyparser.urlencoded({ extended: true })

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
    con.connect('anggota', res, 'SELECT *, tahun FROM anggota INNER JOIN periode ON anggota.periode = periode.id_periode');
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
            var data = pool.getConnection((err, connection) => {
                connection.query("SELECT nama_periode FROM periode", function (err, result, field) {
                  if (err) throw err;
                  res.render("./add_page/anggota", {database : result, layout: "./layout/errorlayout"});
                  connection.release();
                })
            })
            break;
        case "berita":
            res.render("./add_page/berita", {layout: "./layout/errorlayout"});
            break;
        case "periode":
            res.render("./add_page/periode", {layout: "./layout/errorlayout"});
            break
        case "proker":
            var data = pool.getConnection((err, connection) => {
                connection.query("SELECT nama_periode FROM periode", function (err, result, field) {
                  if (err) throw err;
                  res.render("./add_page/anggota", {database : result, layout: "./layout/errorlayout"});
                  connection.release();
                })
            })
            res.render("./add_page/proker", {layout: "./layout/errorlayout"});
            break
        case "user":
            res.render("./add_page/user", {layout: "./layout/errorlayout"});
            break
        default:
            break;
    }
})

app.post('/add_berita', urlencodedParser, (req, res) => {
    var judul_berita = req.body.judul_berita;
    var isi_berita = req.body.isi_berita;
    var penulis = req.body.penulis;
    var data = pool.getConnection((err, connection) => {
        connection.query("INSERT INTO `berita` (`judul_berita`, `isi_berita`, `penulis`) VALUES " + "("  + "'"+ judul_berita +"'" + ", "  + "'"+ isi_berita +"'" + ", " + "(SELECT nim FROM anggota WHERE nama="+ "'" + penulis + "'" + ")" +")" , function (err, result, field) {      
            if (err) throw err;      
            res.redirect("/berita");
            connection.release();    
        })
    })
})

app.post('/add_anggota', urlencodedParser, (req, res) => {
    var nim = (req.body.nim).toString();
    var nama = (req.body.nama).toString();
    var tanggal_lahir = (req.body.tanggal_lahir);
    var prodi = (req.body.prodi).toString();
    var periode = (req.body.periode).toString();
    var jabatan = (req.body.jabatan).toString();
    var data = pool.getConnection((err, connection) => {
        connection.query("INSERT INTO `anggota` (`nim`, `nama`, `tanggal_lahir`, `prodi`, `periode`, `jabatan`) VALUES " + "("  + "'"+ nim +"'" + ", " + "'"+ nama +"'" + ", " + "'"+ tanggal_lahir +"'" + ", " + "'"+ prodi +"'" + ", " + "(SELECT id_periode FROM periode WHERE nama_periode="+ "'" + periode + "'" + ")" + ", " + "'"+ jabatan +"'" +")" , function (err, result, field) {      
            if (err) throw err;      
            res.redirect("/anggota");
            connection.release();    
        })
    })
})

app.post('/add_user', urlencodedParser, (req, res) => {
    var nim = (req.body.nim).toString();
    var nama = (req.body.nama).toString();
    var tanggal_lahir = (req.body.tanggal_lahir);
    var prodi = (req.body.prodi).toString();
    var periode = (req.body.periode).toString();
    var jabatan = (req.body.jabatan).toString();
    var data = pool.getConnection((err, connection) => {
        connection.query("INSERT INTO `anggota` (`nim`, `nama`, `tanggal_lahir`, `prodi`, `periode`, `jabatan`) VALUES " + "("  + "'"+ nim +"'" + ", " + "'"+ nama +"'" + ", " + "'"+ tanggal_lahir +"'" + ", " + "'"+ prodi +"'" + ", " + "(SELECT id_periode FROM periode WHERE nama_periode="+ "'" + periode + "'" + ")" + ", " + "'"+ jabatan +"'" +")" , function (err, result, field) {      
            if (err) throw err;      
            res.redirect("/anggota");
            connection.release();    
        })
    })
})

app.post('/add_periode', urlencodedParser, (req, res) => {
    var tahun = req.body.tahun
    var nama_periode = req.body.nama_periode
    var data = pool.getConnection((err, connection) => {
        connection.query("INSERT INTO `periode` (`tahun`, `nama_periode`) VALUES " + "("  + "'"+ tahun +"'" + ", " + "'"+ nama_periode  +"'" +")", function (err, result, field) {      
            if (err) throw err;      
            res.redirect("/periode");
            connection.release();    
        })
    })
})

app.post('/add_proker', urlencodedParser, (req, res) => {
    var nim = (req.body.nim).toString();
    var nama = (req.body.nama).toString();
    var tanggal_lahir = (req.body.tanggal_lahir);
    var prodi = (req.body.prodi).toString();
    var periode = (req.body.periode).toString();
    var jabatan = (req.body.jabatan).toString();
    var data = pool.getConnection((err, connection) => {
        connection.query("INSERT INTO `anggota` (`nim`, `nama`, `tanggal_lahir`, `prodi`, `periode`, `jabatan`) VALUES " + "("  + "'"+ nim +"'" + ", " + "'"+ nama +"'" + ", " + "'"+ tanggal_lahir +"'" + ", " + "'"+ prodi +"'" + ", " + "(SELECT id_periode FROM periode WHERE nama_periode="+ "'" + periode + "'" + ")" + ", " + "'"+ jabatan +"'" +")" , function (err, result, field) {      
            if (err) throw err;      
            res.redirect("/anggota");
            connection.release();    
        })
    })
})

app.use('/', (req, res) => {
    res.render('error', { layout : "./layout/errorlayout" });
})
// routing


app.listen(port, () => {
    console.log(`localhost:${port}`);
})