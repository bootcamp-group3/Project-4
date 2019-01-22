// Import socket lib
var socket = io();
// Declare socketID
socketID = socket.io.engine.id;
// Declare player ID
var playerID = localStorage.getItem("id");
console.log(`Player: ${playerID}`);
// Declare play no.
var playerNo;
// Parse game ID from url
const url = window.location.pathname;
const gameID = url.substr(url.lastIndexOf("/") + 1);
console.log(`Game ID : ${gameID}`);
// Use the join_game protocol to join namespace
console.log(moment().format("hh:mm:ss"));

function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

// Declare function to render board
function renderBoard(state) {
    $("#target-frame").html("");
    var tileWidth = 70;
    var gutter = 5;
    let boardContainer = $("<div class='board-container' style='position:relative;'>");
    for (var f = 0; f < state.tiles.length; f++) {
        let thisTile = state.tiles[f];
        thisTile.ownerDisp = thisTile.owner;
        let tile = $(`<div class="tile" 
        style="width:${tileWidth}px; position:absolute; 
        top:${thisTile.y * tileWidth + ((thisTile.y + 1) * gutter)}px;
        left:${thisTile.x * tileWidth + ((thisTile.x + 1) * gutter)}px"
        data-toggle="tooltip" data-html="true"<br>">`);
        var tileImgSrc;
        if (thisTile.type === 2) {
            tileImgSrc = "obst";
        } else {
            tileImgSrc = "grass";
        }
        if (thisTile.x === state.players[1].spawn.x && thisTile.y === state.players[1].spawn.y) {
            tileImgSrc = "castle";
            if (playerNo === 1) {
                thisTile.ownerDisp = "Me";
                tile.attr("class", "mySpawn");
            } else if (playerNo === 2) {
                thisTile.ownerDisp = "Enemy";
                tile.attr("class", "enemySpawn");
            }
        }
        if (thisTile.x === state.players[2].spawn.x && thisTile.y === state.players[2].spawn.y) {
            tileImgSrc = "castle";
            if (playerNo === 2) {
                thisTile.ownerDisp = "Me";
                tile.attr("class", "mySpawn");
            } else if (playerNo === 1) {
                thisTile.ownerDisp = "Enemy";
                tile.attr("class", "enemySpawn");
            }
        }
        
        let tileImg = $(`<img src='/assets/media/${tileImgSrc}.png' class='tile-img' style='width:100%;'>`);
        tile.html(tileImg);

        if (state.turn === playerNo) {
            if (((thisTile.x >= state.players[playerNo].loc.x - 2 && thisTile.x <= state.players[playerNo].loc.x + 2) && thisTile.y === state.players[playerNo].loc.y) || ((thisTile.y >= state.players[playerNo].loc.y - 2 && thisTile.y <= state.players[playerNo].loc.y + 2) && thisTile.x === state.players[playerNo].loc.x)) {
                tile.attr("class", "validMove");
            } else if ((thisTile.x === state.players[playerNo].loc.x - 1 || thisTile.x === state.players[playerNo].loc.x + 1) && (thisTile.y === state.players[playerNo].loc.y - 1 || thisTile.y === state.players[playerNo].loc.y + 1)) {
                tile.attr("class", "validMove");
            }
        } 

        tile.attr("title",
            `<u>(${thisTile.x},${thisTile.y})</u>
            <em>Occupied by: </em> <b>${thisTile.ownerDisp}</b><br>
            <em>Fortifications: </em> <b>${thisTile.fortified}</b>`); 
        tile.data("x", thisTile.x);
        tile.data("y", thisTile.y);
        tile.data("occupied", thisTile.owner);
        tile.data("fortified", thisTile.fortified);
        tile.data("tileType", thisTile.type);
        boardContainer.append(tile);
    }
    $("#target-frame").append(boardContainer);
}

socket.on("get_startup", function (msg) {
    socket.removeListener("get_startup");
    console.log(moment().format("hh:mm:ss"));
    console.log("Game startup inititialized");
    let state = msg;
    console.log(state);

    if (state.players[1].playerID === playerID) {
        playerNo = 1;
        console.log(moment().format("hh:mm:ss"));
        console.log("This client is player number " + playerNo);
        console.log("Client  " + playerNo + " rolls first.");
        $("#turn-modal").modal("show");
        $("#turn-button").off();
        $("#turn-button").on("click", function () {
            let roll = rollDie();
            state.players[playerNo].start = roll;
            $("#turn-modal-body").text("You rolled: " + roll);
            $("#turn-button").off();
            socket.emit("send_update", { "id": gameID, "content": state });
            $("#post-roll-trigger").on("click", function () {
                $("#wait-modal").modal("show");
            });
        });
    } else if (state.players[2].playerID === playerID) {
        playerNo = 2;
        console.log(moment().format("hh:mm:ss"));
        console.log("This client is player number " + playerNo);
        console.log("Client  " + playerNo + " rolls second.");
    } else {
        console.log(moment().format("hh:mm:ss"));
        console.log("No player number can be declared at this time");
    }
});


socket.on("get_update", function (msg) {
    let state = msg;
    $("#wait-modal").modal("hide");
    console.log(state);
    
    if (state.setup === true) {
        console.log(moment().format("hh:mm:ss"));
        console.log("Update received in setup mode");
        console.log(state);
        if (state.players[playerNo].playerID === null && state.players[1].playerID !== playerID) {
            state.players.playerID = playerID;
        }
        if (state.players[playerNo].start === null) {
            $("#turn-modal").modal("show");
            $("#turn-button").off();
            $("#turn-button").on("click", function () {
                let roll = rollDie();
                state.players[playerNo].start = roll;
                $("#turn-modal-body").text(roll);
                $("#turn-button").off();
                if (state.players[playerNo].start > state.players[1].start) {
                    state.turn = playerNo;
                    state.setup = false;
                    $(".tile").tooltip("dispose");
                    renderBoard(state);
                    $("[data-toggle='tooltip']").tooltip();
                } else {
                    state.turn = 1;
                    state.setup = false;
                    socket.emit("send_update", { "id": gameID, "content": state });
                }
            });
        } 
    } else {
        $(".tile").tooltip("dispose");
        renderBoard(state);
        $("[data-toggle='tooltip']").tooltip();
    }
});

$(function () {
    console.log("Joining game");
    socket.emit("join_game", { game: gameID, player: playerID });
});
