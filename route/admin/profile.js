const route = require("express").Router();
const profile_controller = require("../../controller/admin/profile");

route.get('/editprofile', (req, res) => {
    res.send("hello")
})
route.get('/', profile_controller.profile)

module.exports = route;