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
        // if (state.turn !== null) {
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

socket.on("get_startup", function (msg) { 
    socket.removeListener("get_startup");
    console.log(moment().format("hh:mm:ss"));
    console.log("Game startup inititialized");
    let state = msg;

    if (state.players[1].playerID === playerID) {
        playerNo = 1;
        console.log(moment().format("hh:mm:ss"));
        console.log("This client is player number " + playerNo);
    } else if (state.players[2].playerID === playerID) {
        playerNo = 2;
        console.log(moment().format("hh:mm:ss"));
        console.log("This client is player number " + playerNo);
    } else {
        console.log(moment().format("hh:mm:ss"));
        console.log("No player number can be declared at this time");
    }
    $("#turn-modal").modal("show");
    $("#turn-button").off();
    $("#turn-button").on("click", function () {
        let roll = rollDie();
        $("#turn-modal-body").text(roll);
        $("#turn-button").off();
    });
});


socket.on("get_update", function (msg) {
    let state = msg;
    $("#wait-modal").modal("hide");
    console.log(state);

    if (state.setup === true) {
        console.log(moment().format("hh:mm:ss"));
        console.log(state);
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
