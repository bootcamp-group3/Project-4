var socket = io();

function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const id = profile.getId(); // Do not send to your backend! Use an ID token instead.
    const name = profile.getName();
    const icon = profile.getImageUrl();

    var data = {
        id: id,
        name: name,
        icon: icon
    };

    console.log(`
    ID: ${id}
    Name: ${name}
    Icon: ${icon}
    `);

    $.ajax("/api/players", {
        type: "POST",
        data: {
            id: id,
            name: name,
            icon: icon
        }
    });

    socket.emit("login", data);
}
$(function(){

    $("#target-lobby-redirect").on("click", function(){
        console.log("click");
        socket.emit("join_lobby",{"as": "google sign in data"});
        window.location.href= "/lobby";
    });
});