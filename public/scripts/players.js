function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const id = profile.getId(); // Do not send to your backend! Use an ID token instead.
    const name = profile.getName();
    const icon = profile.getImageUrl();

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
}