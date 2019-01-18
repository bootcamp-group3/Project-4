const fs = require("fs");

const paths = {
    home: `${__dirname}/../../views/raw/home.html`,
    lobby: `${__dirname}/../../views/raw/lobby.html`,
    game: `${__dirname}/../../views/raw/game.html`
};

var html = {
    home: fs.readFileSync(paths.home, "utf8"),
    lobby: fs.readFileSync(paths.lobby, "utf8"),
    game: fs.readFileSync(paths.game, "utf8")
};

module.exports = html;