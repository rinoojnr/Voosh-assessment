const express = require('express');

const authMiddleware = require('../Middleware/authentication');
const profileController = require('../Controllers/profile');
const multerMiddleware = require('../Middleware/multer');



const upload = multerMiddleware.multer.single('image');


const router = express.Router();


router.get('/myprofile', authMiddleware.authentication, profileController.showMyProfile);
router.get('/viewprofiles', authMiddleware.authentication, profileController.showAllProfiles);
router.put('/editprofile', authMiddleware.authentication, profileController.editProfile);
router.put('/editprofile_picture', authMiddleware.authentication, upload, profileController.editProfilePicture);

module.exports = router;
