var express = require('express');
var userRouter = express.Router();

var User = require("../models/user.model");

userRouter.get("/all", function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            console.log(err)
        }
        res.json(users);
    });
});

userRouter.post("/", function (req, res) {
    console.log(req.body);
    var user = new User();
    user.userId = req.body.user_id;
    user.email = req.body.email;
    user.nickname = req.body.nickname;
    user.name = req.body.name;
    user.avatar = "custom/img/avatars/steve.jpg";
    user.role = "Member";
    user.major = "";
    user.bio = "";
    user.year_joined = null;

    user.save(function (err, user) {
        if (err) {
            console.log(err);
        }
        console.log("New user: " + user);
        res.json(user);
    });
});

module.exports = userRouter;