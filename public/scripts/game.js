// Board.js
class Game {
    constructor(gameId, playerOne, playerTwo, state) {
        this.gameId = gameId;
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.state = state;
        // this.tiles = state.board.tiles;
    }

    drawCanvas() {
        createCanvas(805, 805);
    }
    // Tile

// fortified: 0
// hasBonus: null
// owner: null
// type: 1
// x: 0
// y: 0

// board

// state{
// board{
// bonus: 3
// bonusLim: 3
// border: 3
// reserved: Array(2){
// 0: {reservedFor: "spawn", x: 7, y: 12}
// 1: {reservedFor: "spawn", x: 12, y: 6}
// }
// length: 2
// __proto__: Array(0)
// tiles: (16) [Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16)]
// xLim: 16
// yLim: 16
    drawTiles() {
        for (let i = 0; i < state.board.tiles.length; i++) {
            for (let j = 0; j < state.board.tiles[i][j].length; i++) {
                let tile = state.board.tiles[i][j];

                // Switch statement for tile type
                // switch(tile.type) {
                
                // default: 
                //     break;
                // case 0: 
                //     // White
                //     fill(255);
                //     break;
                // case 1:
                //     // Blue (Water Tile)
                //     fill(0,0,255);
                //     break;
                // case 2:
                //     // Brown (Mountain Tile)
                //     fill(102,51,0);
                // }
                // Switch statement for owner
                // switch(tile.owner) {
                // default:
                //     break;
                // case 0:
                //     // Pink (Player One)
                //     fill(255,0,255);
                //     break;
                // case 1:
                //     // Green (Player Two)
                //     fill(0,255,0);
                //     break;
                // }

                let x = i * 50 + 2;
                let y = j * 50 + 2;
                stroke(0);
                rect(x, y, 50, 50);
                // img() can be used to replace the rectangle with images  
            }
        }
    }

    drawTile(tile) {
        // Switch statement for tile type
        switch(tile.type) {
                
        default: 
            break;
        case 0: 
            // White
            fill(255);
            break;
        case 1:
            // Blue (Water Tile)
            fill(0,0,255);
            break;
        case 2:
            // Brown (Mountain Tile)
            fill(102,51,0);
        }
        // Switch statement for owner
        switch(tile.owner) {
        default:
            break;
        case 0:
            // Pink (Player One)
            fill(255,0,255);
            break;
        case 1:
            // Green (Player Two)
            fill(0,255,0);
            break;
        }
        
        rect(tile.x, tile.y, 50, 50);
    }

        
}
// Example grid code for reference
// let board = [];

// class Tile {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
//     show() {
//         rect(this.x, this.y, 60, 60);
//     }
//     clicked() {
//         if (mouseX > this.x && mouseX < this.x + 60 && mouseY > this.y && mouseY < this.y + 60) {
//             console.log(`You clicked square (x: ${this.x} y: ${this.y})`);
//         }
//     }
// }

// function setup() {
//     createCanvas(605, 605);
//     for(var i = 0; i < 10; i++) {
//         for(var n = 0; n < 10; n++) {
//             let x = i * 60 + 2;
//             let y = n * 60 + 2;
    
//             let rectangle = new Tile(x, y);
//             board.push(rectangle);
//         }
//     }
// }

// function draw() {
//     for(let i = 0; i < board.length; i++) {
//         board[i].show();
//     }
// }

// function mousePressed() {
//     for(let i = 0; i < board.length; i++) {
//         board[i].clicked();
//     }  
// }