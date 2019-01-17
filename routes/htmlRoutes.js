// var db = require("../models");

module.exports = function (app) {
    // Load index page
    app.get("/", function (req, res) {
        res.render("index");
    });
    app.get("/lobby/", function(req, res){

        res.render("lobby");
    });
    app.get("/game", function(req, res){
        res.render("testBoard");
    });
    // app.get("*", function (req, res) {
    //     res.render("404");
    // });
    app.get("/gameBoard", function(req,res){
        res.render("gameBoard");
    });
};