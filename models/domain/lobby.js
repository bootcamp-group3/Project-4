module.exports = function (app) {
    var io = require("socket.io").listen(app.Server);
    io.sockets.on("connection", function (socket) {
        socket.emit("toClient", {
            type: "status",
            msg: "Connection established"
        });
    });
};