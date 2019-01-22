function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const id = profile.getId(); // Do not send to your backend! Use an ID token instead.
    const name = profile.getName();
    const icon = profile.getImageUrl();

    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("icon", icon);


    $.ajax("/api/players", {
        type: "POST",
        data: {
            id: id,
            name: name,
            icon: icon
        }
    });
    
    $("#signInContainer").append("<a class='btn btn-info' href='/lobby'>JOIN GAME</a>");
}