const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    useremail: {
        type: String,
        unique: true
    },
    userphone: {
        type: Number,
        unique: true
    },
    userpassword: String,
    admin: {
        type: Boolean,
        default: false
    },
    profile: {
        photo: String,
        bio: String,
        public: {
            type: Boolean,
            default: true
        }

    }

});


module.exports = mongoose.model('user', userSchema);