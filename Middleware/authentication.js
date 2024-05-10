const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()

exports.authentication = (req, res, next) => {
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err){
        res.status(400).json({succsee: false, message: "user authentication failed"});
    }
}