var db = require("../models");
var game = require("../app/resources/game");
const Cache = require("../models/domain/cache");

module.exports = function (app) {
    app.get("/api/testGen/game", function (req, res) {
        res.json(game.createNew());
    });
    // Create a new game
    app.post("/api/cache/create", async function (req, res) {
        const cache = new Cache(req.body);
        const id = await Cache.createObj(cache);
        res.json(id);
    });
    // Retrieve Game
    app.get("/api/cache/retrieve/:id", async function (req, res) {
        const obj = await Cache.retrieveObj(req.params.id);
        res.json(obj);
    });
    // Update Game
    app.put("/api/cache/update/:id", async function (req, res) {
        const status = await Cache.updateObj(req.params.id, req.body);
        res.json(status);
    });
    // Delete Game
    app.delete("/api/cache/delete/:id", async function (req, res) {
        const status = await Cache.deleteObj(req.params.id);
        res.json(status);
    });
    // Add new player to db.
    app.post("/api/players", function (req, res) {
        db.Player.findOrCreate({
            where: {
                googleId: req.body.googleId
            }
        }, {
            googleId: req.body.id,
            name: req.body.name,
            icon: req.body.icon
        })
            .then(result => {
                res.json({
                    id: result.insertId
                });
                console.log(result);
            });
    });
};