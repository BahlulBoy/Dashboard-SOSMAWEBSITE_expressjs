const express = require('express');
const app = express();
const layout_ejs = require("express-ejs-layouts");
const port = 5000;



app.use(layout_ejs);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('layout', './layout/layout');


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
    res.render('pengaturan_user');
})

app.use('/', (req, res) => {
    res.render('error', { layout : "./layout/errorlayout" });
})
// routing


app.listen(port, () => {
    console.log(`localhost:${port}`);
})