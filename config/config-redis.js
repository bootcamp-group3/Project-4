const redis = require("redis");
var client = redis.createClient();

client.on("connect", function () {
    console.log("connected");
});

client.set("framework", "AngularJS", function (err, reply) {
    console.log(reply);
});

client.get("framework", function (err, reply) {
    console.log(reply);
});

client.hmset("gamestate", {
    "javascript": "AngularJS",
    "css": "Bootstrap",
    "node": "Express"
});

client.hgetall("gamestate", function (err, object) {
    console.log(object);
});

client.exists("gamestate", function (err, reply) {
    if (reply === 1) {
        console.log("gamestate exists");
    } else {
        console.log("gamestate doesn't exist");
    }
});

client.exists("failure", function (err, reply) {
    if (reply === 1) {
        console.log("failure exists");
    } else {
        console.log("failure doesn't exist");
    }
});

client.expire("gamestate", 600);