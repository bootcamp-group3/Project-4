// placeholder game tiles code
let testGame;
function start(p) {
    p.setup = function() {
        p.createCanvas(805, 805);
    };

    p.draw = function() {
        $.get("/api/testGen/game")
            .then(function (game) {
                if (game) {
                    console.log(game);
                    testGame = new Game("test Id", "player1 Id", "player2 Id", game);
                    testGame.drawTiles();

                    
                }
            })
            .catch(function (err) {
                if (err) {
                    console.log(err);
                }
            });
    };
}
let myp5 = new p5(start, testGame); 


        







   
