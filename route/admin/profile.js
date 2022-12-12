const route = require("express").Router();
const profile_controller = require("../../controller/admin/profile");

route.get('/editprofile', (req, res) => {
    res.render("./add_page/periode", {layout: "./layout/errorlayout"});
})
route.get('/', profile_controller.profile)

module.exports = route;