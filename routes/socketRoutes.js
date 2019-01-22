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

        socket.on("join_game", function (msg) {
            let id = msg.game;
            let player = msg.player;
            try {
                socket.join(id);
            } catch (e) {
                console.log(e);
            }
            async function checkBoard(id, player) {
                let gameState = await Game.hasBoard(id, player);
                if (gameState[0] === false) {
                    console.log("Needs board");
                    io.to(id).emit("get_startup", gameState[1]);
                } else if (gameState[0] === true) {
                    console.log("Has board. Sending now...");
                    io.to(id).emit("get_startup", gameState[1]);
                }
            }
            checkBoard(id, player);
            console.log(`Player: ${socket.id} joined game: ${id}`);
        });

        socket.on("send_update", function (obj) {
            gameId = obj.id;
            content = obj.content;
            obj.content.src = "server";
            console.log(`Update to game ${gameId} from socket ${socket.id}`);

            try {
                io.to(gameId).volatile.emit("get_update", obj.content);
            } catch (e) {
                console.log(e);
            }

        });

        socket.on("game_over", function (obj) {
            gameID = obj.id;
            state = obj.content;
            function tally(player) {
                return player.score.owned * player.score.fortified;
            }
            let p1Score = tally(state.players[1]);
            let p2Score = tally(state.players[2]);
            var winner;
            if (p1Score > p2Score) {
                winner = 1;
            } else if (p2Score > p1Score) {
                winner = 2;
            } else if (p1Score === p2Score) {
                winner = null;
            }
            io.to(gameID).emit("final_update", { "winner": winner, "1": p1Score, "2": p2Score });
        });

        socket.on("final_update", function (obj) {
            io.to(obj.id).emit("final_update", obj.content);
        });
    });
};