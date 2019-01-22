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

    $(".signIn").replaceWith("<div class\"signIn\"><div>Welcome " + name + "!</div><br /><div><button type=\"button\" class=\"btn btn-info btn-lg\" id=\"join-game\">Join a Game Now!</button></div></div><br />");
}

// Flip between static and animated card
$(document).on("click", "#join-game", function () {
    event.preventDefault();
    window.location.href = "/lobby";
});