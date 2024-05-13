const express = require('express');
const router = express.Router();

require('dotenv').config();

const secretKey = process.env.SECRETKEY;
const jwt = require("jsonwebtoken"); 

const {UserAuthModel} = require('../models/UserAuthModel');

// Helper Functions 


// Validates the token then provides access to the 
// token's user_id and email via req.user
async function verifyAuth(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // Use optional chaining
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log("invalid token delivered; aborting.")
            return res.status(403).json({ message: 'Token is not valid' });     // verify if this is the right msg to send
        }
        console.log("valid token received. validating...");
        req.user = {
            user_id: decoded.user_id, 
            email: decoded.email
        };
        next();
    });
}

// Routes
router.get('/verifyauthentication', verifyAuth, function(req, res) {
    res
        .status(200)
        .json({ ok: true })
    console.log("completed entry");
})

/// 
router.post('/login', async function(req, res, next) {
    let {email, password} = req.body;
    let existingUser; 
    try {
        console.log(email)
        existingUser = await UserAuthModel.findOne({email: email});

    } catch {
        const error = new Error("Error: (1) Email and/or Password is not found.")
        return next(error);
    }

    console.log('Login pw verifying...')
    if (!existingUser || existingUser.password != password) {
        const error = new Error("Error: (2) Email and/or Password is not found.")
        return next(error);
    }

    let token;
    try { 
        token = jwt.sign(
            { user_id: existingUser._id, email: existingUser.email }, 
            secretKey, 
            { expiresIn: "1hr" }
        );
    } catch (e) {
        const error = new Error("Unable to create execute auth.");
        return next(error);
    }
    console.log('Authentication successful and token delivered!');
    res
        .status(201)
        .json({
            success: true, 
            data: {token: token},
        });
});

module.exports = {
    authenticateRoutes: router, 
    verifyAuth: verifyAuth
};


