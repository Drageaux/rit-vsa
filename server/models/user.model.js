var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    user_id: String,
    email: {type: String, index: {unique: true}},
    nickname: String,
    name: String,
    avatar: String,
    role: String,
    major: String,
    bio: String,
    year_joined: String
});

module.exports = mongoose.model("User", UserSchema);

