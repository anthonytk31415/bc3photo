const mongoose = require('mongoose') 
const Schema = mongoose.Schema;


const ImageSchema = new Schema ({
    filename: String, 
    file: String, 
    date: date
}, {
    collection: 'images'
});

const BlogPostModel = mongoose.model('image', ImageSchema)

module.exports =  {
    ImageModel,
}

