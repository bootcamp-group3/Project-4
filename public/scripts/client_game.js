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

function waitTurn(state) {
    $(".validMove").on("click", function () {
        let sel = {
            x: $(this).data("x"),
            y: $(this).data("y"),
        };
        console.log(`Select (${sel.x}, ${sel.y})`);
        sel.index = ((state.xLim * sel.y) + sel.x);
        if (state.tiles[sel.index].occupied === null) {
            $("#fortify-modal").modal("show");
            $("#roll-button").on("click", function () {
                $("#fortify-modal").modal("hide");
                $("#roll-button").off();
                let roll = rollDie();
                $("#target-roll-disp").text(roll);
                $("#disp-rolled-modal").modal("show");
                setTimeout(() => { 
                    $("#target-roll-disp").text("");
                    $("#disp-rolled-modal").modal("hide");
                }, 1500);
                state.tiles[sel.index].occupied = true;
                state.tiles[sel.index].owner = playerNo;
                state.tiles[sel.index].fortified = roll;

                state.players[playerNo].loc.x = state.tiles[sel.index].x;
                state.players[playerNo].loc.y = state.tiles[sel.index].y;
                if (playerNo === 1) {
                    state.turn = 2;
                } else if (playerNo === 2) {
                    state.turn = 1;
                }
                state.turnsRem--;
                socket.emit("send_update", { "id": gameID, "content": state });

            });
        } else if (state.tiles[sel.index].occupied === true && state.tiles[sel.index].owner !== playerNo) {
            let toWin = state.tiles[sel.index].fortified;
            $("#target-toWin-disp").text(toWin);
            $("#attack-modal").modal("show");
            $("#attack-button").on("click", function () {
                let roll = rollDie();
                if (roll > toWin) {
                    let roll = rollDie();
                    $("#target-roll-disp").text("Opponent defeated with a roll of " + roll);
                    $("#attack-modal").modal("hide");
                    $("#disp-rolled-modal").modal("show");
                    setTimeout(() => {
                        $("#target-roll-disp").text("");
                        $("#disp-rolled-modal").modal("hide");
                    }, 1500);
                } else if (roll < toWin) {
                    let roll = rollDie();
                    $("#target-roll-disp").text("Opponent prevailed against a roll of " + roll);
                    $("#attack-modal").modal("hide");
                    $("#disp-rolled-modal").modal("show");
                    setTimeout(() => {
                        $("#target-roll-disp").text("");
                        $("#disp-rolled-modal").modal("hide");
                    }, 1500);
                }
            });
        }
    });
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
        data-toggle="tooltip" data-html="true">`);
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
                thisTile.owner = playerNo;
                tile.addClass("mySpawn");
            } else if (playerNo === 2) {
                thisTile.ownerDisp = "Enemy";
                thisTile.owner = 1;
                tile.addClass("enemySpawn");
            }
        } else if (thisTile.x === state.players[2].spawn.x && thisTile.y === state.players[2].spawn.y) {
            tileImgSrc = "castle";
            if (playerNo === 2) {
                thisTile.ownerDisp = "Me";
                thisTile.owner = playerNo;
                tile.addClass("mySpawn");
            } else if (playerNo === 1) {
                thisTile.ownerDisp = "Enemy";
                thisTile.owner = 2;
                tile.addClass("enemySpawn");
            }
        }

        if (state.players[1].loc.x === thisTile.x && state.players[1].loc.y === thisTile.y) {
            if (playerNo === 1) {
                tile.addClass("myLoc");
            } else if (playerNo === 2) {
                tile.addClass("enemyLoc");
            }
        } if (state.players[2].loc.x === thisTile.x && state.players[2].loc.y === thisTile.y) {
            if (playerNo === 2) {
                tile.addClass("myLoc");
            } else if (playerNo === 1) {
                tile.addClass("enemyLoc");
            }
        }

        let tileImg = $(`<img src='/assets/media/${tileImgSrc}.png' class='tile-img' style='width:100%;'>`);
        tile.html(tileImg);

        if (state.turn === playerNo) {
            if (((thisTile.x >= state.players[playerNo].loc.x - 2 && thisTile.x <= state.players[playerNo].loc.x + 2) && thisTile.y === state.players[playerNo].loc.y) || ((thisTile.y >= state.players[playerNo].loc.y - 2 && thisTile.y <= state.players[playerNo].loc.y + 2) && thisTile.x === state.players[playerNo].loc.x)) {
                if (thisTile.type !== 2){
                    tile.addClass("validMove");
                }
            }else if ((thisTile.x === state.players[playerNo].loc.x - 1 || thisTile.x === state.players[playerNo].loc.x + 1) && (thisTile.y === state.players[playerNo].loc.y - 1 || thisTile.y === state.players[playerNo].loc.y + 1)) {
                if (thisTile.type !== 2) {
                    tile.addClass("validMove");
                }
            }
        }

        if (thisTile.owner === playerNo) {
            thisTile.ownerDisp = "Me";
            tile.addClass("myTile");
        } else if (thisTile.owner === null) {
            thisTile.ownerDisp = "Unclaimed";
        } else {
            thisTile.ownerDisp = "Enemy";
            tile.addClass("enemyTile");
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
            $("#turn-modal").modal("hide");
            let roll = rollDie();
            $("#target-roll-disp").text(roll);
            $("#disp-rolled-modal").modal("show");
            setTimeout(() => {
                $("#target-roll-disp").text("");
                $("#disp-rolled-modal").modal("hide");
            }, 1500);
            state.players[playerNo].start = roll;
            $("#turn-button").off();
            socket.emit("send_update", { "id": gameID, "content": state });

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
            state.players[playerNo].playerID = playerID;
        }
        if (state.players[playerNo].start === null) {
            $("#turn-modal").modal("show");
            $("#turn-button").off();
            $("#turn-button").on("click", function () {
                $("#turn-modal").modal("hide");
                let roll = rollDie(); 
                $("#target-roll-disp").text(roll);
                $("#disp-rolled-modal").modal("show");
                setTimeout(() => {
                    $("#target-roll-disp").text("");
                    $("#disp-rolled-modal").modal("hide");
                }, 1500);
                state.players[playerNo].start = roll;
                if (state.players[playerNo].start > state.players[1].start) {
                    state.turn = playerNo;
                    state.setup = false;
                    $(".tile").tooltip("dispose");
                    renderBoard(state);
                    $("[data-toggle='tooltip']").tooltip();
                    waitTurn(state);
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
        if (state.turn === playerNo) {
            waitTurn(state);
        }
    }
});

$(function () {
    console.log("Joining game");
    socket.emit("join_game", { game: gameID, player: playerID });
});