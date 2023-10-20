const mongoose = require('mongoose') 
const Schema = mongoose.Schema;


const ImageSchema = new Schema ({
    name: String, 
    file: String, 
    date: Date,
    user_id: mongoose.Schema.Types.ObjectId, 
}, {
    collection: 'images'
});

const ImageModel = mongoose.model('image', ImageSchema)

module.exports =  {
    ImageModel,
}

