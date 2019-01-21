// Import socket lib
var socket = io();
// Declare socket ID
var socketID;
// Parse game ID from url
const url = window.location.pathname;
const gameID = url.substr(url.lastIndexOf("/") + 1);
console.log(`Game ID : ${gameID}`);

// Enable toolTips
//Declare function to render board
function renderBoard(state) {
    $("#target-frame").html("");
    var tileWidth = 90;
    var gutter = 5;
    let boardContainer = $("<div class='board-container' style='position:relative;'>");
    for (var f = 0; f < state.tiles.length; f++) {
        let thisTile = state.tiles[f];
        let tile = $(`<div class="tile" 
        style="width:${tileWidth}px; position:absolute; 
        top:${thisTile.y * tileWidth + ((thisTile.y + 1) * gutter)}px;
        left:${thisTile.x * tileWidth + ((thisTile.x + 1) * gutter)}px"
        data-toggle="tooltip" data-html="true"
        title="<u>Occupied by: </u> <b>${thisTile.owner}</b><br>
        <u>Fortifications: </u> <b>${thisTile.fortified}</b> <br>">`);
        var tileImgSrc;
        if (thisTile.type === 9) {
            tileImgSrc = "castle";
        } else if (thisTile.type === 0) {
            tileImgSrc = "grass";
        } else if (thisTile.type === 2) {
            tileImgSrc = "obst";
        } else {
            tileImgSrc = "grass";
        }
        let tileImg = $(`<img src='/assets/media/${tileImgSrc}.png' class='tile-img' style='width:100%;'>`);
        tile.html(tileImg);
        // tile.text(`(${thisTile.x + 1},${thisTile.y + 1})\nFort:${thisTile.fortified}`);
        tile.data("x", thisTile.x + 1);
        tile.data("y", thisTile.y + 1);
        tile.data("occupied", thisTile.owner);
        tile.data("fortified", thisTile.fortified);
        tile.data("tileType", thisTile.type);
        boardContainer.append(tile);
    }
    console.log();
    $("#target-frame").append(boardContainer);
}

// Upon initial connection
socket.on("connect", function () {
    // Declare socketID
    socketID = socket.io.engine.id;
    console.log("This client is on socket: ");
    console.log(socketID + "\n\n");

    // Use the join_game protocol to join namespace
    socket.emit("join_game", gameID);

    socket.on("get_update", function (msg) {
        console.log(msg);
        // if (msg.players[socketID] === undefined) {
        //     let newEvent = msg;
        //     // Add player to data object
        //     console.log("Adding player to obj");
        //     newEvent.players[socketID] = {
        //         position: {
        //             x: 10,
        //             y: 10
        //         },
        //         spawn: {
        //             x: 0,
        //             y: 0
        //         },
        //         score: {
        //             tiles: 0,
        //             fortified: 0
        //         }
        //     };
        //     if (msg.reserved.length > 1) {
        //         newEvent.players[socketID].spawn.x = msg.reserved[0].x;
        //         newEvent.players[socketID].spawn.y = msg.reserved[0].y;
        //         newEvent.players[socketID].position.x = msg.reserved[0].x;
        //         newEvent.players[socketID].position.y = msg.reserved[0].y;

        //         let spawnIndex = newEvent.players[socketID].position.x * (newEvent.players[socketID].position.y + 1);
        //         newEvent.tiles[spawnIndex].owner = socketID;
        //         newEvent.tiles[spawnIndex].fortified = 6;

        //         newEvent.reserved = [msg.reserved[1]];
        //     } else if (msg.reserved.length === 1) {
        //         newEvent.players[socketID].spawn.x = msg.reserved[0].x;
        //         newEvent.players[socketID].spawn.y = msg.reserved[0].y;
        //         newEvent.players[socketID].position.x = msg.reserved[0].x;
        //         newEvent.players[socketID].position.y = msg.reserved[0].y;

        //         let spawnIndex = newEvent.players[socketID].position.x * (newEvent.players[socketID].position.y + 1);
        //         newEvent.tiles[spawnIndex].owner = socketID;
        //         newEvent.tiles[spawnIndex].fortified = 6;

        //         newEvent.reserved = null;
        //     }
        //     socket.emit("send_update", { "id": gameID, "content": newEvent });
        // } else {
        //     console.log("Player already in obj");
        //     $(".tile").tooltip("dispose");
        //     renderBoard(msg);
        //     $("[data-toggle='tooltip']").tooltip();
         
        // }
    });
});

