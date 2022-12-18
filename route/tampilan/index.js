const route = require("express").Router();

route.get('/contact', (req, res) => {
    res.render('./tampilan/contact', {layout: "./layout/main"})
})
route.get('/', (req, res) => {
    res.render('./tampilan/index', {layout: "./layout/main"})
})
route.use('/berita', require("./berita"))
route.use('/staff-ahli', require("./staff_ahli"))
route.use('/dirjen', require("./dirjen"))
route.use('/mentri', require("./mentri"))
route.use('/periode', require("./periode"))
route.use('/program-kerja', require("./program_kerja"))
route.use('/galeri', require(".//galeri"))

module.exports = route