const route = require("express").Router();

route.use('/contact', require("./contact"))
route.use('/berita', require("./berita"))
route.use('/staff-ahli', require("./staff_ahli"))
route.use('/dirjen', require("./dirjen"))
route.use('/mentri', require("./mentri"))
route.use('/periode', require("./periode"))
route.use('/program-kerja', require("./program_kerja"))
route.use('/galeri', require("./galeri"))
route.use('/', require("./main"))

module.exports = route