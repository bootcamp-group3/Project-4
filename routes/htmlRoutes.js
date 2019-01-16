// var db = require("../models");

module.exports = function (app) {
    // Load index page
    app.get("/", function (req, res) {
        res.render("index");
    });
    app.get("/testLobby", function(req, res){
        res.render("testLobby");
    });
    // app.get("*", function (req, res) {
    //     res.render("404");
    // });
};