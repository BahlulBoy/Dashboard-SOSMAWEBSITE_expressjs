const route = require('express').Router();

route.get('/contact', (req, res) => {
    res.render('./tampilan/contact', {layout: "./layout/main"})
})
route.get('/staff-ahli', (req, res) => {
    res.render('./tampilan/staff ahli', {layout: "./layout/main"})
})
route.get('/mentri', (req, res) => {
    res.render('./tampilan/mentri', {layout: "./layout/main"})
})
route.get('/dirjen', (req, res) => {
    res.render('./tampilan/dirjen', {layout: "./layout/main"})
})
route.get('/periode', (req, res) => {
    res.render('./tampilan/periode', {layout: "./layout/main"})
})
route.get('/galeri', (req, res) => {
    res.render('./tampilan/galeri', {layout: "./layout/main"})
})
route.get('/program-kerja', (req, res) => {
    res.render('./tampilan/program kerja', {layout: "./layout/main"})
})
route.get('/berita', (req, res) => {
    res.render('./tampilan/berita', {layout: "./layout/main"})
})
route.get('/', (req, res) => {
    res.render('./tampilan/index', {layout: "./layout/main"})
})

module.exports = route