const route = require("express").Router()

route.use('/contact', require('./contact'))
route.use('/profile', require('./profile'))
route.use('/anggota', require('./anggota'))
route.use('/berita', require('./berita'))
route.use('/periode', require('./periode'))
route.use('/proker', require('./proker'))
route.use('/user', require('./user'))
route.use('/logout', require('./logout'))
route.use('/', (req, res) => {
    res.redirect('/admin/profile')
})

module.exports = route;