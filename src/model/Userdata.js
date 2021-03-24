const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/library');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    type: String,
    fname: String,
    lname: String,
    phone: String,
    email:String,
    password:String
});

var Userdata = mongoose.model('userdata', UserSchema);
 
module.exports = Userdata;

