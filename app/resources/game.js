var board = require("./board");

class Game {
    constructor (){
        this.state = {};
        board.getFor(this);

        
    }
}

module.exports= {
    Game : Game,
    createNew : function(){
        return new Game();
    }
};