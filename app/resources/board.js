// board.js
// Grandma's Browser Cookies
// zrheaume

//* MODULE
//*      definitions: 
//*         class Tile
//*         class Board
//*
//*      exports:
//*         class Tile
//*         class Board
//*         function getFor(game) [ where <game> is Game proto ] 

// Default parameters for the game board. xLim = width in tiles, yLim = height in tiles
// border and bonusLim are used by randomization algorithm
// border limits how far in from the edge of the board ocean tiles may appear
// bonusLim limits the number of bonus tiles the board can have

const defaultBoardOptions = {
    xLim: 16,
    yLim: 16,
    border: 3,
    bonusLim: 3
};

// typeRoll is the chance factor in board generation. 
// When a new instance of the Tile class is created, it will call 
// typeRoll on itself ( { tile : this , zone : < typeRoll action > } )

// typeRoll then directly modifies the necessary property in the
// Tile instance object

function typeRoll(tile, zone) {
    var roll;
    switch (zone) {
    case "border":
        // For border tiles, we roll for either a 0 (Plain type) or a 1 (Ocean obstacle type)
        roll = Math.round(Math.random());
        // We set the tile's type property to the result
        return tile.type = roll;
    case "inland":
        // For inland tiles, we again roll for either a 0 or a 1
        roll = Math.round(Math.random());
        if (roll === 1) {
            // This time, if we roll a 1 
            return tile.type = 2;
        } else {
            return tile.type = roll;
        }
    case "bonusType":
        roll = Math.floor(Math.random() * 3);
        return tile.bonusType = roll;
    default:
        roll = Math.round(Math.random());
        return roll;
    }
}

class Tile {
    constructor(coords, board) {
        // Tile types:
        // 0 - "plain"
        // 1 - "ocean"
        // 2 - "mountain"
        // 9 - "spawn"

        this.x = coords[0];
        this.y = coords[1];
        this.owner = null;
        this.fortified = 0;

        // Logic to check if the Tile we are constructing is one of our two reserved tiles
        if (this.x === board.reserved[0].x && this.y === board.reserved[0].y || this.x === board.reserved[1].x && this.y === board.reserved[1].y) {
            // If it is one, set properties...
            this.type = 9;
            this.hasBonus = false;
            this.bonusType = null;
            this.owner = "playerStart";
            this.fortified = 6;
        } else {
            // If the tile we are constructing is not reserved...
            
            // We need to randomly pick a type for our tile.

            if (this.x < board.border || this.x >= board.xLim - board.border) {
                // If the tile is in the left/right border
                // typeRoll this tile
                typeRoll(this, "border");
            } else if (this.y < board.border || this.y >= board.yLim - board.border) {
                // Or if the tile is in the top/bottom border
                // typeRoll this tile
                typeRoll(this, "border");
            } else if ( (this.x >= board.border && this.x < board.xLim - board.border) && (this.y >= board.border && this.y < board.yLim - board.border) ) {
                // Or if the tile is outside the border,
                // typeRoll this tile
                typeRoll(this, "inland");
            } else if (this.type === undefined) {
                this.type = 0;
            } 
            // Now we declare the hasBonus property.
            this.hasBonus = null;
            // For now, we'll only place bonuses on tiles that are type 0/"plain"
            if (this.type === 0 && board.bonus < board.bonusLim) {
                // So if we have a type 0 tile and have not already assigned our limit of bonus tiles, 
                // well set the hasBonus property to a 0 or 1 roll.
                this.hasBonus = typeRoll();
                if (this.hasBonus === 0) {
                    // If we roll a 0, it's false.
                    this.hasBonus = false;
                } else if (this.hasBonus === 1) {
                    // If we roll a 1, hasBonus is true
                    this.hasBonus = true;
                    // And we'll also call typeRoll one final time to determine
                    // what type of bonus tile we have.
                    this.bonusType = typeRoll(this, "bonusType");
                    board.bonus++;
                } else {
                    console.log("An error occured in board assignment");
                }
            }
        }
    }

}

class Board {
    constructor() {
        this.xLim = defaultBoardOptions.xLim;
        this.yLim = defaultBoardOptions.yLim;
        this.border = defaultBoardOptions.border;
        this.bonusLim = defaultBoardOptions.bonusLim;
        this.bonus = 0;
        this.reserved = [];
        this.tiles = [];
        this.spawnPlayers(2);
        this.generate();
    }
    spawnPlayers(q) {
        for (var c = 0; c < q; c++) {
            let spawnX = Math.floor(Math.random() * (this.xLim / q)) + ((this.xLim / q) * c);
            let spawnY = Math.floor(Math.random() * (this.yLim));
            this.reserved.push({
                reservedFor: "spawn",
                x: spawnX,
                y: spawnY
            });
        }
    }
    generate() {
        for (var row = 0; row < this.yLim; row++) {
            let thisRow = [];
            for (var col = 0; col < this.xLim; col++) {
                thisRow.push(new Tile([col, row], this));
            }
            this.tiles.push(thisRow);
        }
    }
}


module.exports = {
    getFor: function (game) {
        return game.state.board = new Board();
    },
    Board: Board,
    Tile: Tile
};