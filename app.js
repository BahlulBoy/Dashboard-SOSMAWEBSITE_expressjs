const express = require('express');
const app = express();
const layout_ejs = require("express-ejs-layouts");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const port = 5000;


app.use(layout_ejs);
app.use(express.static('public'));


app.set('view engine', 'ejs');
app.set('layout', './layout/layout');


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
    res.render('anggota');
})
app.get('/berita', (req, res) => {
    res.render('berita');
})
app.get('/periode', (req, res) => {
    res.render('periode');
})
app.get('/proker', (req, res) => {
    res.render('proker');
})
app.get('/pengaturan-user', (req, res) => {
    var data = pool.getConnection((err, connection) => {
        connection.query("SELECT * FROM user ", function (err, result, field) {
            if (err) throw err;
            res.render('pengaturan_user', {database : result});
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