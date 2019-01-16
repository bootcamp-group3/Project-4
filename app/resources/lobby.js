const Cache = require("../../models/domain/cache");

class Gremlin {
    static async addToLobby(note){
        var lastCached = await Cache.retrieveObj("lobby");
        let newState = JSON.parse(lastCached.state);
        if(newState.users[note.sender]){
            return Promise.resolve(lastCached);
        } else {
            newState.count++;
            newState.users[note.sender] = { matched : note.matched } ;
            // console.log(newState);
            var newlyCached = await Cache.updateObj("lobby", {state: JSON.stringify(newState)});
    
            return Promise.resolve(newlyCached);
        }
    }
}

module.exports = class Lobby {
    static async create(){
        await Cache.deleteObj("lobby");
        let initialLobbyState = {
            count: 0,
            users: {
                "test" : null
            }
        };
        const delegateCache = await Cache.createObj({
            id: "lobby",
            item : {state: JSON.stringify(initialLobbyState)}
        });
        return Promise.resolve(delegateCache);
    }

    static listen(pipe){
        pipe.on("message", function(msg){
            let note = JSON.parse(msg);
            console.log(note);
            if(note.action === "join"){
                Gremlin.addToLobby(note)
                    .then(function(){
                        Cache.retrieveObj("lobby")
                            .then(function(data){
                                pipe.send(JSON.stringify(data));
                            });
                    });
            }
        });
    }
    
};
