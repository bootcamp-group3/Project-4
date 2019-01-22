// Import socket lib
var socket = io();
// Declare socket ID
var playerID = localStorage.getItem("id");
// Parse game ID from url
const url = window.location.pathname;
const gameID = url.substr(url.lastIndexOf("/") + 1);
console.log(`Game ID : ${gameID}`);

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
        title="<u>Occupied by: </u> <b>${thisTile.owner}</b><br>
        <u>Fortifications: </u> <b>${thisTile.fortified}</b> <br>">`);
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
    socket.emit("join_game", { game: gameID, player: playerID});

    socket.on("get_update", function (msg) {
        console.log(msg);
        $(".tile").tooltip("dispose");
        renderBoard(msg);
        $("[data-toggle='tooltip']").tooltip();

        if (msg.turn === null) {
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
                
            });
        }
    });
});

