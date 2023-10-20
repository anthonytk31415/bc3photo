const express = require('express');
const router = express.Router();
const mongoose = require('mongoose') 

const {BlogPostModel} = require('../models/BlogPostModel');
const {ImageModel} = require('../models/ImageModel');


router.get('/blogdata', async function (req, res) {

    console.log('initiating get /blog route.')
    try {
        let data = await BlogPostModel.find({}, 'date title cover blogBody');
        console.log('data completed; trying to insert real image for each image path')

        // create the array of promises to grab all the blogposts in parallel

        data = JSON.parse(JSON.stringify(data));

        const promises = data.map( async (x) => {
            console.log(x, "promise-x")
            let cur = await getImage(x.cover);
            return cur
        })

        const blurbs = data.map( (x) => {
            let res; 
            for (let i = 0; i < x.blogBody.length; i ++) {
                let cur = x.blogBody[i]
                if (cur.type == "text") {
                    res = cur.data.slice(0,20);
                    break;  
                }
            }
            return res
        })

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
        // console.log(blurbs)
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