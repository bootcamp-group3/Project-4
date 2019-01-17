module.exports = function (io) {
    // Load index page
    io.on("connection", function () {
        console.log("a user connected");
    });
};