require("dotenv").config();
var express = require("express");
const app = express();

var exphbs = require("express-handlebars");
var db = require("./models");
var http = require("http").Server(app);
const io = require("socket.io")(http);

var PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use("/assets", express.static(`${__dirname}/public/.`));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");
exphbs.registerHelper("inc", function (value) {
    return parseInt(value) + 1;
});

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/socketRoutes")(io);
// require("./models/domain/lobby")(app);

var syncOptions = {
    force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
    http.listen(PORT, function () {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});

module.exports = app;