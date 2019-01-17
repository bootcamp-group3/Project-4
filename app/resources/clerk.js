const Cache = require("./../../models/domain/cache");

Cache.deleteObj("lobby").then(
    function(status){
        console.log(status);
        Cache.createObj({
            id: "lobby",
            item: {
                connections: 0,
                sockets : []
            }
        });
    }
);

module.exports = {
    join : async function(socketID){
        let cachedLobbyState = await Cache.retrieveObj("lobby");
        let updatedLobbyState = cachedLobbyState;
        updatedLobbyState.connections ++;
        updatedLobbyState.sockets.push(socketID);
        console.log("To cache: ");
        console.log(updatedLobbyState);
        await Cache.updateObj("lobby", updatedLobbyState);
        return Promise.resolve(updatedLobbyState);
    },
    has : function(socketID){
        Cache.retrieveObj("lobby").then(function(lobbyState){
            if(lobbyState.sockets.indexOf(socketID) !== -1){
                return true;
            } else if (lobbyState.sockets.indexOf(socketID) === -1){
                return false;
            } else {
                return false;
            }
        });
    }
};