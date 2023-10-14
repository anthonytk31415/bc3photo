const express = require('express');
const router = express.Router();

const {BlogPostModel} = require('../models/BlogPostModel');

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

module.exports = router;