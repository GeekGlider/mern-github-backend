const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    name : {
        type : String,
        default : "",
    },
    profileUrl : {
        type : String,
        required : true,
    },
    avatarUrl : {
        type : String,
         default : "",
    },
    likedProfiles : {
        type : [String],
        default : [],
    },
    likedBy : [
        {
            username : {
                type : String,
                required : true,
            },
            avatarUrl : {
                type : String,
                 default : "",
            },
            likedDate : {
                type : Date,
                default : Date.now(),
            }
        }
    ]
} , {timestamps:true});

const User = mongoose.model( 'User', userSchema );

module.exports = User;
