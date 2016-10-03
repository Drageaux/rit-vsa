var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    userRouter = require("./server/routers/userRouter");

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost:27017/vsa-rit");

// Settings
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// Resource loading
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use("/", express.static(__dirname + "/client"));

// API routers
app.use("/user", userRouter);

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/client/index.html");
});

app.listen(process.env.PORT || '3000', function () {
    console.log("I'm listening on PORT: " + (process.env.PORT || "3000"));
});