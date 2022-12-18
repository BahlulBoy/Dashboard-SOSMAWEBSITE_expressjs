module.exports = {
    logout(req, res) {
        req.session.destroy((err) => {
            res.redirect('/admin')
        })
    }
}