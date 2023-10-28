const express = require('express');
const router = express.Router();

const { BlogPostModel } = require('../models/BlogPostModel');
const { verifyAuth } = require('./authenticateRoutes');
const { ImageModel } = require('../models/ImageModel');

const { getNowDate } = require('../functions/helper');
const { GalleryPhotoModel } = require('../models/GalleryPhotoModel');


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
    const newImg = await newImage.save();
    return newImg._id;
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
        // iterate through blogBody to find image coded in raw string
        // then store it in images using imageUpload, then 
        // store in this object with the image_id
        let updateBlogBody = [];
        for (let i = 0; i < postData.blogBody.length; i ++) {
            let blogBodyItem; 
            let cur = postData.blogBody[i]
            if (cur.type == "imageSet") {
                // if cur == image then do the image stuff; then append
                let image_id = await imageUpload(cur.data.name, cur.data.file, user_id)
                // upload image. then put the id in the data portion; for get requests, we'll then download data
                blogBodyItem = {
                    type: cur.type, 
                    data: {
                        caption: cur.data.caption, 
                        name: cur.data.name,
                        image_id: image_id, 
                    }
                }
            } else {
            // else; not image, so just append; data = string
                blogBodyItem = {
                    type: cur.type, 
                    data: cur.data
                }
            }
            updateBlogBody.push(blogBodyItem);
        }
        cover_id = await imageUpload(postData.coverName, postData.cover, user_id);
        const newPost = new BlogPostModel({
            authorId: user_id, 
            title: postData.title, 
            date: getNowDate(),
            blogBody: updateBlogBody, 
            cover: cover_id,
        })
        await newPost.save()
    } catch(e) {
        console.error(e)
    }
    console.log("(3) current status: ", res.statusCode) 
});



router.post('/galleryphoto', verifyAuth, async function(req, res, next) {

    let postData = req.body;
    let user_id = req.user.user_id; 

    try {

        let image = await imageUpload(postData.name, postData.image, user_id);
        let subImage1 =  await imageUpload(`${postData.name}-sub1`, postData.subImage1, user_id);
        let subImage2 =  await imageUpload(`${postData.name}-sub2`, postData.subImage2, user_id);
        const newPost = new GalleryPhotoModel({
            date: getNowDate(),
            user_id: user_id, 
            name: postData.name,
            image: image, 
            blurb: postData.blurb, 
            prices: postData.prices,
            productDims: postData.productDims, 
            country: postData.country, 
            subImage1: subImage1, 
            subImage2: subImage2, 
            isArialPhoto: postData.isArialPhoto,
        })

        await newPost.save()
        
    } catch(e) {
        console.error(e)
    }
}); 


module.exports = router;