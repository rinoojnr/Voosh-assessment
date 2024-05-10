const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../Models/user');

var authentication = (userid) => {
    return jwt.sign({userid}, process.env.JWT_SECRET);
}

//UserRegistration
exports.signup = async (req, res) => {
    try {
        const saltRounds = 10;
        const { username, useremail, userphone, userpassword } = req.body;
        const existingUser = await User.findOne({ $or: [{useremail}, {userphone}]})
        if(existingUser) return res.status(400).json({success: false, message: 'user already exist'});
        const hashedPassword = await bcrypt.hash(userpassword, saltRounds);
        User.create({ username, useremail, userphone, userpassword: hashedPassword })
        .then((result) => {
            res.status(200).json({success: true, message: 'new user created', token: authentication(result)});
        })
        .catch((err) => {
            res.status(400).json({success: false, message: 'user creation failed'});
        })
    } catch(err) {
        res.status(500).json({success: false, message: 'server error'});
    } 
}


//UserLogin
exports.login = async (req, res) => {
    try {
        const { useremail, userpassword } = req.body;
        const userDetailes = await User.findOne({useremail});
        if(!userDetailes) return res.status(401).json({success: false, message: 'user not found'});
        bcrypt.compare(userpassword, userDetailes.userpassword,(err, result) => {
            if(result) res.status(200).json({success: true, message: 'loged in successfully', token: authentication(userDetailes._id)});
            else res.status(400).json({success: false, message: 'wrong password'}); 
        });
    } catch(err) {
        res.status(500).json({success: false, message: 'server error'});
    }
}

//UserLogout
exports.logout = (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({success: false, message: 'server Error'});
            }
            res.redirect('/login');
        });
    } else {
        res.status(400).json({success: false, message: 'session not found'});
    }
    
}