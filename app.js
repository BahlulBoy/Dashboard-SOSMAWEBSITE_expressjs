const express = require('express');
const app = express();
const layout = require("express-ejs-layouts");
const port = 5000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(layout);

app.get('/profile', (req, res) => {
    res.render('profile');
})

app.use('/', (req, res) => {
    res.send("Halaman Tidak Ditemukan");
})

app.listen(port, () => {
    console.log(`localhost:${port}`);
})