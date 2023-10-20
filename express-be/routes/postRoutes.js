const express = require('express');
const router = express.Router();

const { BlogPostModel } = require('../models/BlogPostModel');
const { verifyAuth } = require('./authenticateRoutes');
const { ImageModel } = require('../models/ImageModel');

const { getNowDate } = require('../functions/helper');


// upload image
// now lets add from the token > the emial to this to find the userID 
// all data is in the req.body under {name, file}
// all user data in req.user under {user_id}
async function imageUpload(name, file, user_id) {
    const newImage = new ImageModel({
        name: name, 
        file: file, 
        date: getNowDate(), 
        user_id: user_id, 
    })
    const newImg = await newImage.save()
    return newImg._id
}

// testing the image with a standalone fetch request from the client to upload the image
router.post('/image', verifyAuth, async function(req, res, next) {
    let user_id = req.user.user_id; 
    await imageUpload(req.body.name, req.body.file, user_id);
    console.log('image successfully uploaded')
    let myResponse = {'response': 'Your post has been successfully saved!'}
    res.json(myResponse);
});

// post for saving a post// do i want to say /posts/save? for this post request? 
router.post('/blogpost', verifyAuth, async function(req, res, next) {
    let postData = req.body;
    let user_id = req.user.user_id; 
    let cover_id;   // will contain the id of the image
    console.log("(1) current status: ", res.statusCode)
    try { 
        cover_id = await imageUpload(postData.coverName, postData.cover, user_id);
        const newPost = new BlogPostModel({
            authorId: user_id, 
            title: postData.title, 
            date: getNowDate(),
            blogBody: postData.blogBody, 
            cover: cover_id,
        })

        await newPost.save()

    } catch(e) {
        console.error(e)
    }


    console.log("(3) current status: ", res.statusCode) 
});


module.exports = router;