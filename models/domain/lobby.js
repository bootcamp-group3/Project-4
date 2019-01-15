module.exports = function(app){
    require("express-ws")(app);
    const Lobby = require("./../../app/resources/lobby");
    const lobbyURL = "/join/lobby";
    
    Lobby.create();

    app.ws(lobbyURL, Lobby.listen);

};