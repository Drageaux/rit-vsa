var express = require('express');
var userRouter = express.Router();

var User = require("../models/user.model");

userRouter.get("/:email", function (req, res) {
    User.findOne({email: req.params.email}, function (err, user) {
        if (err) {
            console.log(err)
        }
        res.json(user);
    });
});

userRouter.get("/all", function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            console.log(err)
        }
        res.json(users);
    });
});

userRouter.post("/", function (req, res) {
    console.log(req.body + "\n");
    User.findOne({email: req.body.email}, function (err, user) {
        if (err || user == null) {
            var newUser = new User();
            newUser.userId = req.body.user_id;
            newUser.email = req.body.email;
            newUser.nickname = req.body.nickname;
            newUser.name = req.body.name;
            newUser.avatar = "custom/img/avatars/steve.jpg";
            newUser.role = "Member";
            newUser.major = "";
            newUser.bio = "";
            newUser.year_joined = null;
            newUser.save(function (err, newUser) {
                if (err) {
                    console.log(err);
                }
                console.log("New user: " + newUser);
                res.json(newUser);
            });
        } else {
            res.json(user);
        }
    });

});

module.exports = userRouter;