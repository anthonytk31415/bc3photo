const express = require('express');
const router = express.Router();

const {BlogPostModel} = require('../models/BlogPostModel');
const {verifyAuth} = require('./authenticateRoutes');

// post for saving a post// do i want to say /posts/save? for this post request? 
router.post('/blogpost', verifyAuth, async function(req, res) {
    let postData = req.body;
    let user_id = req.user.user_id; 
    // save the body to the data base
    // postData = addTimeToPost(postData); 
    
    const newPost = new BlogPostModel({
        authorId: user_id, 
        title: postData.title, 
        date: postData.date,
        blogBody: postData.blogBody, 
        cover: postData.cover
    })

    await newPost.save()
    // console.log('heres time updated post data: ', postData);
    // savePost(postData); 
    let myResponse = {'response': 'Your post has been successfully saved!'}
    res.json(myResponse);
});

module.exports = router;