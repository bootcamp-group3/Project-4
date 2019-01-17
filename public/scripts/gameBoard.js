class Tile {
    constructor(x, y, type, owner, fortified) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.owner = owner;
        this.fortified = fortified;
    }
}

function drawBoard(game) {
    const board = game.state.board;
    let boardDiv = $("<div>").attr("id", "grid");
    for(let i = 0; i < board.xLim; i++) {
        let row = $("<div>").attr("id", "row" + i).css({float: "left"});
        for(let n = 0; n < board.yLim; n++) {
            let tiles = board.tiles;
            let color = "white";
            let tempTile = new Tile(i, n, tiles[i][n].type, tiles[i][n].owner, tiles[i][n].fortified);
            let tempDiv = $("<div>");
            tempDiv.attr("id", i + "," + n);
            tempDiv.attr("x", tempTile.x);
            tempDiv.attr("y", tempTile.y);
            tempDiv.attr("type", tempTile.type);
            tempDiv.attr("owner", tempTile.owner);
            tempDiv.attr("fortified", tempTile.fortified);

            switch(tempTile.type) {
            case 0:
                color = "white";
                break;
            case 1:
                color = "blue";
                break;
            case 2:
                color = "brown";
                break;
            case 9:
                color = "green";
                break;
            default:
                break; 
            }
            tempDiv.css({backgroundColor: color, width: "50px", height: "50px", border: "solid black 3px", float: "left"});
            row.append(tempDiv);
            
        }
        boardDiv.append(row);
    }
    $("#board-frame").append(boardDiv);
}

// state:
// board:
// bonus: 3
// bonusLim: 3
// border: 3
// reserved: (2) [{…}, {…}]
// tiles: (16) [Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16)]
// xLim: 16
// yLim: 16
$.get("/api/testGen/game")
    .then(function (game) {
        if (game) {
            console.log(game);  
            drawBoard(game); 
        }
    })
    .catch(function (err) {
        if (err) {
            console.log(err);
        }
    });