// const bdOpt = {
//     tileWidth : 40,
//     tileHeight : 40
// };



// function drawBoard(board) {
//     var frameWidth = bdOpt.tileWidth * board.xLim;
//     var frameHeight = bdOpt.tileHeight * board.yLim;
//     var target = $("#board-frame");

     
    

// }

function getNewGame() {
    $.get("/api/testGen/game")
        .then(function (game) {
            if (game) {
                console.log(game);
                drawBoard(game.state.board);
            }
        })
        .catch(function (err) {
            if (err) {
                console.log(err);
            }
        });
}

$(function () {
    getNewGame();
});