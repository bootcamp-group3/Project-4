// placeholder game tiles code
// let testGame;
// function start(p) {
//     p.setup = function() {
//         p.createCanvas(805, 805);
//     };

//     p.draw = function() {
//         $.get("/api/testGen/game")
//             .then(function (game) {
//                 if (game) {
//                     console.log(game);
//                     testGame = new Game("test Id", "player1 Id", "player2 Id", game);
//                     testGame.drawTiles();

                    
//                 }
//             })
//             .catch(function (err) {
//                 if (err) {
//                     console.log(err);
//                 }
//             });
//     };
// }
// let myp5 = new p5(start, testGame); 
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

// function setup() {
//     createCanvas(805, 805); 
//     background(105);  
// }

// function draw() {
//     for (let i = 0; i < 10; i++) {
//         for (let j = 0; j < 10; i++) {
//             let width = 50;
//             let height = 50;
//             let x = i * width + 2;
//             let y = j * height + 2;

//             stroke(255);
//             fill(0);
//             rect(x, y, width, height);
            
//         }
//     }
// }







   
