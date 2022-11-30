const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const port = 5000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressEjsLayouts);

app.get('/', (req, res) => {
    res.render('index');
})


app.use('/', (req, res) => {
    res.send("Halaman Tidak Ditemukan");
})

app.listen(port, () => {
    console.log(`localhost:${port}`);
})