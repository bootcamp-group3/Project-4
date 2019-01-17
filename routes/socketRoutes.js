module.exports = function (io) {
    // Load index page
    io.on("connection", function (socket) {
        console.log(`A user has connected at socket ${socket.id}`);
        
        // Disconnect handler
        socket.on("disconnect", function(){
            console.log(`User on socket ${socket.id} has disconnected`);
        });

        socket.on("login",function(args){
            console.log(args);
            console.log("This user has requested authentication via OAUTH");
        });


        // When a client emits a join lobby
        socket.on("join_lobby",function(args){
            console.log(args);
            console.log("A user is joining the lobby");
        });
        
        socket.on("join_game", function(args){
            console.log(args);
            console.log("A user is joining a game");
        });
    });

};