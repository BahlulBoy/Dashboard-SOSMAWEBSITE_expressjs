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

// routing
// app.get('/profile', (req, res) => {
//     res.render('profile');
// })
// app.get('/anggota', (req, res) => {
//     con.connect('anggota', res, 'SELECT *, tahun FROM anggota INNER JOIN periode ON anggota.periode = periode.id_periode');
// })
// app.get('/berita', (req, res) => {
//     con.connect('berita', res, 'SELECT *, nama FROM berita INNER JOIN anggota ON berita.penulis = anggota.nim');
// })
// app.get('/periode', (req, res) => {
//     con.connect('periode', res, 'SELECT * FROM periode');
// })
// app.get('/proker', (req, res) => {
//     con.connect('proker', res, 'SELECT *, nama, nama_periode FROM proker INNER JOIN anggota ON proker.penanggungjawab = anggota.nim INNER JOIN periode ON proker.periode = periode.id_periode');
// })
// app.get('/user', (req, res) => {
//     con.connect('user', res, 'SELECT * FROM user');
// })

app.get('/add', (req, res) => {
    var page = req.query.page;
    switch (page) {
        case "berita":
            
            break;
        case "periode":
            res.render("./add_page/periode", {layout: "./layout/errorlayout"});
            break
        case "proker":
            var data = pool.getConnection((err, connection) => {
                connection.query("SELECT nama_periode FROM periode", function (err, result, field) {
                  if (err) throw err;
                  res.render("./add_page/proker", {database : result, layout: "./layout/errorlayout"});
                  connection.release();
                })
            })
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
    res.send(typeof(isi_berita));
    var data = pool.getConnection((err, connection) => {
        connection.query("INSERT INTO `berita` (`judul_berita`, `isi_berita`, `penulis`) VALUES " + "("  + "'"+ judul_berita +"'" + ", "  + "'"+ isi_berita +"'" + ", " + "(SELECT nim FROM anggota WHERE nama="+ "'" + penulis + "'" + ")" +")" , function (err, result, field) {      
            if (err) throw err;      
            res.redirect("/berita");
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
    const { image } = req.files;
    var nama_proker = (req.body.nama_proker).toString();
    var tanggal_proker = (req.body.tanggal).toString();
    var lokasi = (req.body.tanggal_lokasi_proker);
    var deskripsi = (req.body.deskripsi).toString();
    var penanggung_jawab = (req.body.penanggung_jawab).toString();
    var foto_dokumentasi = image.name;
    var periode = (req.body.periode).toString();
    var data = pool.getConnection((err, connection) => {
        connection.query("INSERT INTO `proker` (`nama_proker`, `tanggal`, `lokasi`, `deskripsi`, `penanggungjawab`, `dokumentasi` , `periode`) VALUES " + "("  + "'"+ nama_proker +"'" + ", " + "'"+ tanggal_proker +"'" + ", " + "'"+ lokasi +"'" + ", " + "'"+ deskripsi +"'" + ", " + "(SELECT nim FROM anggota WHERE nama="+ "'" + penanggung_jawab + "'" + ")" + ", " + "'" + foto_dokumentasi + "'" +  ", " + "(SELECT id_periode FROM periode WHERE nama_periode="+ "'" + periode + "'" + ")" + ")" , function (err, result, field) {      
             if (err) throw err;      
             image.mv("./public/img/dokumentasi/" + foto_dokumentasi);
             res.redirect("/anggota");
             connection.release();    
        })
    })
})

app.post('/add_user', urlencodedParser, (req, res) => {
    const { image } = req.files;
    var nama = (req.body.nama).toString();
    var username = (req.body.username).toString();
    var email = (req.body.email);
    var password = (req.body.password).toString();
    var profile = image.name;
    var data = pool.getConnection((err, connection) => {
        connection.query("INSERT INTO `user` (`nama`, `username`, `email`, `password`, `foto`) VALUES " + "("  + "'"+ nama +"'" + ", " + "'"+ username +"'" + ", " + "'"+ email +"'" + ", " + "MD5(" + "'"+ password +"'" + ")" + ", " + "'"+ profile +"'" +")" , function (err, result, field) {      
            if (err) throw err;
            image.mv("./public/img/profile/" + profile);
            res.redirect("/user");
            connection.release();
        })
    })
})

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