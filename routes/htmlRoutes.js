// var db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index");
    });

    app.get("/game", function(req,res){
        res.render("game");
    });

    app.get("/lobby", function(req,res){
        res.render("lobby");
    });
};