var db = require("../models");
const Cache = require("../models/domain/cache");

module.exports = function (app) {

    // Create a new cache object
    app.post("/api/cache/create", async function (req, res) {
        try {
            const cache = new Cache(req.body);
            const id = await Cache.createObj(cache);

            if (id === null) {
                throw null;
            } else {
                res.status(201).json(id);
            }

        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    });

    // Retrieve cache object
    app.get("/api/cache/retrieve/:id", async function (req, res) {
        try {
            const obj = await Cache.retrieveObj(req.params.id);

            if (obj === null) {
                throw null;
            } else {
                res.status(200).json(obj);
            }

        } catch (error) {
            console.log(error);
            res.status(404).end();
        }
    });

    // Update cache object
    app.put("/api/cache/update/:id", async function (req, res) {
        try {
            const status = await Cache.updateObj(req.params.id, req.body);

            if (status === null) {
                throw null;
            } else {
                res.status(200).json(status);
            }

        } catch (error) {
            console.log(error);
            res.status(404).end();
        }
    });

    // Delete cache object
    app.delete("/api/cache/delete/:id", async function (req, res) {
        try {
            const status = await Cache.deleteObj(req.params.id);

            if (status === null) {
                throw null;
            } else {
                res.status(200).json(status);
            }

        } catch (error) {
            console.log(error);
            res.status(404).end();
        }
    });

    // Find or create player in db.
    app.post("/api/players", function (req, res) {
        console.log(`ID: ${req.body.id}
        ------------------------------
        ------------------------------`
        );
        const selector = {
            where: {
                googleId: req.body.id
            },

            defaults: {
                googleId: req.body.id,
                name: req.body.name,
                icon: req.body.icon
            }
        };
        db.Player.findOrCreate(selector)
            .then(result => {
                res.json({
                    id: result.insertId
                });
            });
    });
    // Gets leadearboard
    app.get("/api/leaderboard", function (req, res) {
        db.Game.findAll({
            limit: 10,
            order: [
                db.sequelize.fn("max", db.sequelize.col("score"))
            ],
            include: [
                {
                    model: db.Player
                }
            ]
        }).then(Game => {
            const resObj = Game.map(Game => {
                return Object.assign(
                    {},
                    {
                        name: Player.name,
                        score: Game.score
                    }
                );
            });
            res.json(resObj);
        });
    });
};