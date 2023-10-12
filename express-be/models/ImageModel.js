const mongoose = require('mongoose') 
const Schema = mongoose.Schema;


const ImageSchema = new Schema ({
    filename: String, 
    file: String, 
    date: Date,
}, {
    collection: 'images'
});

const ImageModel = mongoose.model('image', ImageSchema)

module.exports =  {
    ImageModel,
}

