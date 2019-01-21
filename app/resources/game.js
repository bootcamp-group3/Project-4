const cache = require("../../models/domain/cache");

const defaultBoardOptions = {
    xLim: 12,
    yLim: 12,
    border: 2,
    bonusLim: 2
};

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
            roll = Math.round(Math.random() * 10);
            if (roll === 10) {
                // This time, if we roll a 1 
                return tile.type = 2;
            } else {
                return tile.type = 0;
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
        this.occupied = null;

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
        } else if ((this.x >= board.border && this.x < board.xLim - board.border) && (this.y >= board.border && this.y < board.yLim - board.border)) {
            // Or if the tile is outside the border,
            // typeRoll this tile
            typeRoll(this, "inland");
        } else if (this.type === undefined) {
            this.type = 0;
        }
    }
}

class Board {
    constructor() {
        this.xLim = defaultBoardOptions.xLim;
        this.yLim = defaultBoardOptions.yLim;
        this.border = defaultBoardOptions.border;
        this.players = {
            1: {
                socket: null,
                loc: {
                    x: null,
                    y: null
                },
                spawn: {
                    x: null,
                    y: null
                },
                score: {
                    owned: null,
                    fortified: null
                }
            },
            2: {
                socket: null,
                loc: {
                    x: null,
                    y: null
                },
                spawn: {
                    x: null,
                    y: null
                },
                score: {
                    owned: null,
                    fortified: null
                }
            }
        };
        this.tiles = [];
        this.spawnPlayers(2);
        this.generate();
    }
    spawnPlayers(q) {
        for (var c = 0; c < q; c++) {
            let spawnX = Math.floor((Math.random() * (this.xLim / q)) + ((this.xLim / q) * c));
            let spawnY = Math.floor(Math.random() * (this.yLim));
            this.players[c + 1].spawn = {
                x: spawnX,
                y: spawnY
            };
        }
    }
    generate() {
        for (var row = 0; row < this.yLim; row++) {
            for (var col = 0; col < this.xLim; col++) {
                this.tiles.push(new Tile([col, row], this));
            }
        }
    }
}

module.exports = {
    hasBoard: async function (gameID) {
        let state = await cache.retrieveObj(gameID);
        // console.log(state);
        if (state === null) {
            let newBoard = new Board();
            await cache.updateObj(gameID, newBoard);
            return Promise.resolve([false, newBoard]);
        } else {
            return Promise.resolve([true, state]);
        }
    },
    Board: Board,
    Tile: Tile
};