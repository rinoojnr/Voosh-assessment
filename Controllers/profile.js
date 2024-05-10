const bcrypt = require('bcrypt');

const User = require('../Models/user');
const s3Service = require('../Services/s3');

//Fetches user details based on their id
exports.showMyProfile = (req, res) => {
    try {
        const userId = req.user.userid;
        User.findById(userId,'-userpassword -__v -_id')
        .then((result) => {
            res.status(200).json({success: true, message: 'user detailes feteched successfully', data: result});
        });
    } catch(err) {
        res.status(500).json({success: false, message: 'server error'});
    }
} 

//Admin users can view all user profiles, including private and public. Regular users can only view public profiles.
exports.showAllProfiles = (req,res) =>{
    try {
        const userId = req.user.userid;
        User.findById(userId)
        .then((result) => {
            if(result.admin) {
                User.find().select('-userpassword -__v -admin -_id').then((response)=>{
                    return res.status(200).json({success: true, message: 'feteched all users profiles', data: response})
                })
            }
            if(!result.admin) {
                User.find({profile: {public: true}}).select('-userpassword -__v -admin -_id').then((response)=>{
                    return res.status(200).json({success: true, message: 'feteched all users profiles', data: response})
                })
            }
        })
    } catch(err) {
        res.status(500).json({success: false, message: 'server error'});
    }
}

//ProfileUpdate
exports.editProfile = async (req, res) => {
    try {
        const { username, userphone, useremail, userpassword, bio, public, imageURL } = req.body;
        const userId = req.user.userid;
        User.findById(userId)
        .then( async (result) => {
            if(!result) return res.status(404).json({success: false, message: 'user not found'});
            if(username) result.username = username;
            if(userphone) result.userphone = userphone;
            if(useremail) result.useremail = useremail;
            if(userpassword) {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(userpassword, saltRounds);
                result.userpassword = hashedPassword;
            }
            if(imageURL) result.profile.photo = imageURL;
            if(bio) result.profile.bio = bio;
            if(public === false) result.profile.public = false;
            if(public === true) result.profile.public = true;
            await result.save();
            res.status(200).json({success: true, message: 'profile edited successfully'});
            
        });
    } catch(err) {
        res.status(500).json({success: false, message: 'server error'});
    }
}

//ProfilePictureUpdate
exports.editProfilePicture = (req, res) => {
    try{
        const userId = req.user.userid;
        const image = req.file;
        console.log(req.file)
        const filename = `userprofile/_${userId}_${image}`;
        User.findById(userId)
        .then( async (result) => {
            if(image) {
                const image_URL = await s3Service.uploadToS3(image.buffer, filename);
                result.profile.photo = image_URL;
            } 
            await result.save();
            res.status(200).json({success: true, message: 'profile picture edited successfully'});
        });
    } catch(err) {
        res.status(500).json({success: false, message: 'server error'});
    }
}
