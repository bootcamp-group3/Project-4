$(function () {
    // the URL to our server side websocket that connects to the lobby.
    let joinURL = `https://${location.hostname}:${location.port}/`;
    // event listener on join Lobby button.
    $("#target-btn").on("click", function () {
        socket = io.connect(joinURL);
        socket.on("toClient", function (data) {
            console.log(data);
        });
    });
});