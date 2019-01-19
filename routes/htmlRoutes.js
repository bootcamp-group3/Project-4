// var db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index");
    });

    app.get("/game/:id", function(req,res){
        console.log(req.params.id);
        res.render("game");
    });

    app.get("/lobby", function(req,res){
        res.render("lobby");
    });
};