const express = require('express');
const router = express.Router();
const mongoose = require('mongoose') 

const {BlogPostModel} = require('../models/BlogPostModel');
const {ImageModel} = require('../models/ImageModel');

router.get('/blogdata', async function (req, res) {

    console.log('initiating get /blog route.')
    try {
        const data = await BlogPostModel.find();
        console.log('blah')
        console.log(data);
        res.json(data);

    } catch(e){
    console.error('Error in GET /blogdata;', e);
    res.status(500).json({error: 'Internal Server Error'})
    }
});


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