const lobby = require("./../app/resources/clerk");
const cache = require("../models/domain/cache");

//!For testing
const Game = require("../app/resources/game");

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

        socket.on("getBoard", function () {
            //!For now, just return a random board
            var testBoard = new game.Board();
            var blob = game.Board.render(testBoard);
            io.emit("newBoard", { "content": blob });
        });

        socket.on("login", function (args) {
            console.log("This user has requested authentication via OAUTH");
            console.log(args);
        });

        socket.on("in_lobby", function (args) {
            console.log("A user is in the lobby.");
            if (args) {
                console.log(args);
            }
            lobby.join(socket.id).then(function (players) {
                let game = new cache();

                console.log(players);

                // Two players have been matched up
                if (players !== null) {
                    const gameSpace = `/${game.id}`;
                    io.emit("update_lobby", gameSpace);
                }
            });
        });

        socket.on("join_game", function(id) {
            try {
                socket.join(id);
            } catch (e) {
                console.log(e);
            }
            async function checkBoard(id) {
                let gameState = await Game.hasBoard(id);
                if (gameState[0] === false) {
                    console.log("Needs board");
                    io.to(id).emit("start_game", { "content": gameState[1] });
                }
            }
            checkBoard(id);
            console.log(`Player: ${socket.id} joined game: ${id}`);
        });

        socket.on("send_update", function(obj) {
            gameId = obj.id;
            content = obj.content;

            try {
                socket.to(gameId).emit("get_update", obj.content);
            } catch (e) {
                console.log(e);
            }

        });
    });
};