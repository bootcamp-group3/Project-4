const lobby = require("./../app/resources/clerk");
const cache = require("../models/domain/cache");
const renderHTML = require("../app/resources/render");

module.exports = function (io) {
    // Load index page
    io.on("connection", function (socket) {
        console.log(`A user has connected at socket ${socket.id}`);

        // Disconnect handler
        socket.on("disconnect", function () {
            console.log(`User on socket ${socket.id} has disconnected`);
            if (lobby.has(socket.ID)) {
                //remove socket from lobby
            }
        });

        socket.on("getHTML", function (req) {
            console.log("A user has requested html");
            console.log(req);
            switch (req.for_page) {
                case "home":
                    io.emit("render", { "content": renderHTML.home });
                    break;
                case "lobby":
                    io.emit("render", { "content": renderHTML.lobby });
                    break;
                case "game":
                    io.emit("render", { "content": renderHTML.game });
                    break;
                default:
                    io.emit("render", { "content": renderHTML.home });
                    break;
            }
        });

        socket.on("login", function (args) {
            console.log("This user has requested authentication via OAUTH");
            console.log(args);
        });

        // When a client emits a join lobby
        socket.on("join_lobby", function (args) {
            console.log("A user is joining the lobby");
            console.log(args);
        });

        socket.on("in_lobby", function (args) {
            console.log("A user is in the lobby.");
            if (args) {
                console.log(args);
            }
            lobby.join(socket.id).then(function (updatedObj) {
                lobbyState = updatedObj[0];
                players = updatedObj[1];
                const game = new cache();

                // Two players have been matched up
                if (players !== null) {
                    const gameSpace = `/${game.id}`;
                    io.emit("update_lobby", gameSpace);

                    var nsp = io.of(gameSpace);
                    nsp.on("connection", function () {
                        console.log("someone connected");
                    });
                    nsp.emit("hi", "everyone!");
                }
                io.to(players).emit("game", game.id);
            });
        });

        socket.on("join_game", function (args) {
            console.log("A user is joining a game");
            console.log(args);
        });
    });

};