const lobby = require("./../app/resources/clerk");

module.exports = function (io) {
    // Load index page
    io.on("connection", function (socket) {
        console.log(`A user has connected at socket ${socket.id}`);
        
        // Disconnect handler
        socket.on("disconnect", function(){
            console.log(`User on socket ${socket.id} has disconnected`);
            if(lobby.has(socket.ID)){
                //remove socket from lobby
            }
        });

        socket.on("login",function(args){
            console.log("This user has requested authentication via OAUTH");
            console.log(args);
        });

        // When a client emits a join lobby
        socket.on("join_lobby",function(args){
            console.log("A user is joining the lobby");
            console.log(args);
        });

        socket.on("in_lobby", function(args){
            console.log("A user is in the lobby.");
            if(args){
                console.log(args);
            }
            lobby.join(socket.id).then(function(updatedLobbyState){
                console.log(updatedLobbyState);
                io.emit("update_lobby");
            });
        });
        
        socket.on("join_game", function(args){
            console.log("A user is joining a game");
            console.log(args);
        });
    });

};