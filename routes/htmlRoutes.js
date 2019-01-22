// var db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        db.Game.findAll({
            limit: 10,
            order: [
                ["score", "DESC"]
            ],
            include: [{
                model: db.Player
            }]
        }).then(Game => {
            var hbsObject = Game.map(Leaderboard => {
                return Object.assign({}, {
                    name: Leaderboard.Player.name,
                    score: Leaderboard.score
                });
            });
            res.render("index", hbsObject);
        });
    });

    app.get("/game/:id", function (req, res) {
        console.log(req.params.id);
        res.render("game");
    });

    app.get("/lobby", function (req, res) {
        res.render("lobby");
    });
};