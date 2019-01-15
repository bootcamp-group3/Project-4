$(function () {
    // the URL to our server side websocket that connects to the lobby.
    let joinURL = `ws://${location.hostname}:8080/join/lobby`;
    // event listener on join Lobby button.
    $("#target-btn").on("click", function () {
        // Open new websocket at joinURL
        let pipe = new WebSocket(joinURL);
        let user = "test";
        let matched = false;
        pipe.onopen = function () {
            let joinReq = {
                action: "join",
                sender: user,
                matched: matched
            };

            pipe.send(JSON.stringify(joinReq));
        };
        pipe.onmessage = function (msg) {
            console.log(msg);
            let note = JSON.parse(msg.data);
            let state = JSON.parse(note.state);
            $("#target-data-lobbyCount").text(state.count);
        };
        pipe.onclose = function () {
            let leaveReq = {
                action: "leave",
                sender: user,
                matched: false
            };
            pipe.send(JSON.stringify(leaveReq));
        };
    });
});