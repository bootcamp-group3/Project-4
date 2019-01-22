// Import socket lib
var socket = io();
// Declare socket ID
var playerID = localStorage.getItem("id");
console.log(`Player: ${playerID}`);
var playerNo;
// Parse game ID from url
const url = window.location.pathname;
const gameID = url.substr(url.lastIndexOf("/") + 1);
console.log(`Game ID : ${gameID}`);
// Use the join_game protocol to join namespace
console.log(moment().format("hh:mm:ss"));
console.log("Joining game");
socket.emit("join_game", { game: gameID, player: playerID });

// Declare function to render board
function renderBoard(state) {
    $("#target-frame").html("");
    var tileWidth = 70;
    var gutter = 5;
    let boardContainer = $("<div class='board-container' style='position:relative;'>");
    for (var f = 0; f < state.tiles.length; f++) {
        let thisTile = state.tiles[f];
        let tile = $(`<div class="tile" 
        style="width:${tileWidth}px; position:absolute; 
        top:${thisTile.y * tileWidth + ((thisTile.y + 1) * gutter)}px;
        left:${thisTile.x * tileWidth + ((thisTile.x + 1) * gutter)}px"
        data-toggle="tooltip" data-html="true"
        title="<u>(${thisTile.x},${thisTile.y})</u>
        <em>Occupied by: </em> <b>${thisTile.owner}</b><br>
        <em>Fortifications: </em> <b>${thisTile.fortified}</b> <br>">`);
        var tileImgSrc;
        if (thisTile.type === 0) {
            tileImgSrc = "grass";
        } else if (thisTile.type === 2) {
            tileImgSrc = "obst";
        } else if (thisTile.type === 9) {
            tileImgSrc = "castle";
        } else {
            tileImgSrc = "grass";
        }
        let tileImg = $(`<img src='/assets/media/${tileImgSrc}.png' class='tile-img' style='width:100%;'>`);
        tile.html(tileImg);
        // if (state.turn != null) {
        //     if (thisTile.x === state.players[playerNo].spawn.x && thisTile.y === state.players[playerNo].spawn.y) {
        //         tile.attr("class", "mySpawn");
        //     } else if (thisTile.x === state.players[playerNo].loc.x && thisTile.y === state.players[playerNo].loc.y) {
        //         tile.attr("class", "myLoc");
        //     }
        // }
        tile.data("x", thisTile.x);
        tile.data("y", thisTile.y);
        tile.data("occupied", thisTile.owner);
        tile.data("fortified", thisTile.fortified);
        tile.data("tileType", thisTile.type);
        boardContainer.append(tile);
    }
    $("#target-frame").append(boardContainer);
}

// Declare socketID
socketID = socket.io.engine.id;

socket.on("get_update", function (msg) {
    let state = msg;
    $("#wait-modal").modal("hide");
    console.log(state);

    $(".tile").tooltip("dispose");
    renderBoard(state);
    $("[data-toggle='tooltip']").tooltip();

    if (state.turn === null && state.setup === true) {
        console.log(moment().format("hh:mm:ss"));
        console.log("Turn has not yet been decided");
        if (state.players[1].playerID === playerID && state.players[1].start === null) {
            console.log(moment().format("hh:mm:ss"));
            console.log("This player must roll.");
            playerNo = 1;
            $("#turn-modal").modal("show");
            $("#turn-button").on("click", function () {
                $("#turn-button").off();
                let roll = Math.floor(Math.random() * 6) + 1;
                state.players[1].start = roll;
                $("#turn-modal-body").append(`<h3>${roll}</h3>`);
                $("#turn-button").text("CLOSE");
                $("#turn-button").on("click", function () {
                    $("#turn-modal").modal("hide");
                });
                setTimeout(function () {
                    $("#turn-modal").modal("hide");
                    socket.emit("send_update", { "id": gameID, "content": state });
                }, 1000);

            });
        } else if (state.players[1].playerID === playerID && state.players[1].start != null) {
            console.log(moment().format("hh:mm:ss"));
            console.log("Waiting for opponent to roll");
            $("#wait-modal").modal("show");

        } else if (state.players[2].playerID === playerID && state.players[1].start != null && state.players[2].start === null) {
            console.log(moment().format("hh:mm:ss"));
            console.log("Opponent has rolled. Your turn. ");
            playerNo = 2;
            $("#turn-modal").modal("show");
            $("#turn-button").on("click", function () {
                $("#turn-button").off();
                let roll = Math.floor(Math.random() * 6) + 1;
                console.log(roll);
                $("#turn-modal-body").append(`<h3>${roll}</h3>`);
                $("#turn-button").text("CLOSE");
                $("#turn-button").on("click", function () {
                    $("#turn-modal").modal("hide");
                });
                setTimeout(function () {
                    $("#turn-modal").modal("hide");
                }, 2000);
                state.players[2].start = roll;
                socket.emit("send_update", { "id": gameID, "content": state });

            });
        } else if (state.players[2].playerID === playerID && state.players[1].start === null) {
            console.log(moment().format("hh:mm:ss"));
            console.log("Waiting for opponent to roll");
            $("#wait-modal").modal("show");
        } else if (state.players[1].start != null && state.players[2] != null) {
            console.log(moment().format("hh:mm:ss"));
            console.log("Both oppoenents have rolled");
            if (state.players[1].start > state.players[2].start) {
                state.turn = 1;
            } else {
                state.turn = 2;
            }
            state.setup = false;
            socket.emit("send_update", { "id": gameID, "content": state });
        }
    } else if (state.turn === playerNo) {
        console.log(moment().format("hh:mm:ss"));
        console.log("Your turn to make a move");
    } else if (state.turn != playerNo && state.turn != null) {
        console.log(moment().format("hh:mm:ss"));
        console.log("Not your turn to make a move");
    }
});

