let newGame;
$.get("/api/testGen/game")
    .then(function (game) {
        if (game) {
            newGame = game;   
        }
    })
    .catch(function (err) {
        if (err) {
            console.log(err);
        }
    });

let board = [];

class Tile {
    constructor(x, y, xCoord, yCoord) {
        this.x = x;
        this.y = y;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.color = "white";
    }
    show() {
        if(this.color = "white") {
            fill(255);
            rect(this.x, this.y, 60, 60);
        } else if (this.color = "purple") {
            fill(255,0,255);
            rect(this.x, this.y, 60, 60);
        }
        
    }
    clicked() {
        if (mouseX > this.x && mouseX < this.x + 60 && mouseY > this.y && mouseY < this.y + 60) {
            console.log(`You clicked square (x: ${this.xCoord} y: ${this.yCoord})`);
            $("#x").text("X: " + this.xCoord);
            $("#y").text("Y: " + this.yCoord);
        }
    }
}

function setup() {
    createCanvas(605, 605);
    for(var i = 0; i < 10; i++) {
        for(var n = 0; n < 10; n++) {
            let x = i * 60 + 2;
            let y = n * 60 + 2;
    
            let rectangle = new Tile(x, y, i, n);
            board.push(rectangle);
        }
    }
}

function draw() {
    for(let i = 0; i < board.length; i++) {
        board[i].show();
    }
}

function mousePressed() {
    for(let i = 0; i < board.length; i++) {
        board[i].clicked();
    }  
}






   
