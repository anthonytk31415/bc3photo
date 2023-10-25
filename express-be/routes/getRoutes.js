const express = require('express');
const router = express.Router();
const mongoose = require('mongoose') 

const {BlogPostModel} = require('../models/BlogPostModel');
const {ImageModel} = require('../models/ImageModel');
const { GalleryPhotoModel } = require('../models/GalleryPhotoModel');


router.get('/blogdata', async function (req, res) {

    console.log('initiating get /blog route.')
    try {
        let data = await BlogPostModel.find({}, 'date title cover blogBody _id');
        console.log('data completed; trying to insert real image for each image path')

        // create json on data for mutability; Mongoose output is not mutable
        data = JSON.parse(JSON.stringify(data));

        // create the array of promises to grab all the blogposts in parallel
        const promises = data.map( async (x) => {
            let cur = await getImage(x.cover);
            return cur
        })

        // const blurbs = data.map( (x) => {
        //     let res; 
        //     for (let i = 0; i < x.blogBody.length; i ++) {
        //         let cur = x.blogBody[i]
        //         if (cur.type == "text") {
        //             res = cur.data.slice(0,20);
        //             break;  
        //         }
        //     }
        //     return res
        // })

        // iterate through blogbody to find first text element to truncate for blurb 
        let curBlurb;
        for (let i = 0; i < data.length; i++) {

            let curBlogBody = data[i].blogBody
            for (let j = 0; j < curBlogBody.length; j ++) {
                if (curBlogBody[j].type == "text") {
                    curBlurb = curBlogBody[j].data.slice(0,20);
                    break 
                }
            }
            data[i].blurb = curBlurb; 
            delete data[i].blogBody;        // remove to save space for response
        }

        // execute the array in parallel
        Promise.all(promises)
            .then((results) => {
                for (let i = 0; i < results.length; i++) {
                    data[i].cover = results[i];
                }
                res.json(data);
            })
    } catch(e){
        console.error('Error in GET /blogdata;', e);
        res.status(500).json({error: 'Internal Server Error'})
    }
});



router.get('/blog/:blog_id', async function (req, res) {
    const blog_id = req.params.blog_id; 
    try {
        let data = await BlogPostModel.findOne(
            { _id: new mongoose.Types.ObjectId(blog_id)}
        );
        data = JSON.parse(JSON.stringify(data));

        // now handle the images
        let newCover = await getImage(data.cover)
        data.cover = newCover

        // iterate over blogBody = [element0, element2, ...]
        for (let i = 0; i < data.blogBody.length; i ++) {
            let element = data.blogBody[i];
            if (element.type == 'imageSet') {
                console.log(element.data.image_id)
                const curImage = await getImage(element.data.image_id)

                const newData = {
                    caption: element.data.caption,
                    file: curImage,
                }
                element.data = newData;
            }
        }
        return res.json(data);

    } catch (e) {
        console.log(e);
    }
}); 

/// galleryphoto

router.get('/galleryphoto/:galleryphoto_id', async function (req, res) {
    const galleryphoto_id = req.params.galleryphoto_id; 
    try {
        let data = await GalleryPhotoModel.findOne(
            { _id: new mongoose.Types.ObjectId(galleryphoto_id)}
        );
        data = JSON.parse(JSON.stringify(data));

        // now handle the images
        const images = ['image', 'subImage1', 'subImage2']

        for (let i = 0; i < images.length; i ++) {
            let curImage = await getImage(data[images[i]])
            data[images[i]] = curImage
        }
        return res.json(data);

    } catch (e) {
        console.log(e);
    }
}); 

router.get('/galleries', async function (req, res) {
    try {
        let data = await GalleryPhotoModel.find({}, 'name _id, image')
        data = JSON.parse(JSON.stringify(data));
        
        for (let i = 0; i < data.length; i ++){
            let curGalleryPhoto = data[i];
            let img = await getImage(curGalleryPhoto.image);
            curGalleryPhoto.image = img;
        }

        return res.json(data)
    } catch (e) {
        console.log(e);
    }

});


// when you get a specific user_id you need to also fetch the images and ensure transformation. 
// integrate getting user name and then dual promise chainig for get/blogdata
// async function getName(user_id) {
//     try {
//         const data = await ImageModel.findOne(
//             { _id: new mongoose.Types.ObjectId(image_id)}, 
//             'file -_id'
//         )
//         return data.file
//     } catch(e) {
//         console.error(e)
//     }
// }


async function getImage(image_id) {
    try {
        const data = await ImageModel.findOne(
            { _id: new mongoose.Types.ObjectId(image_id)}, 
            'file -_id'
        )
        return data.file
    } catch(e) {
        console.error(e)
    }
}

// test to get an image basedon the image id encoded as a string
// this works!
router.get('/image', async function (req, res) {
    // let image_id = req.body.imagePath; 
    let image_id = "6531ad56f575e786b6dae4e9"
    console.log('initiating get /image route.')
    try {
        const data = await getImage(image_id)
        res.json(data);
    } catch(e){
    console.error('Error in GET /blogdata;', e);
    res.status(500).json({error: 'Internal Server Error'})
    }
});

module.exports = router;