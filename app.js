const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const userRouter = require('./Routes/user');
const profileRouter = require('./Routes/profile');

dotenv.config();
const app = express();


app.use(bodyParser.json());
app.use(userRouter);
app.use(profileRouter);
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

mongoose.connect(process.env.MONGO_CREDENTIALS)
.then(() => {
    app.listen(process.env.PORT || 3000,()=> {
        console.log(`Running on port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log("Database connection failed");
}); 