// class GalleryPhoto {
//     constructor(id, name, image, blurb, prices, productDims, country, subImage1, subImage2, isArialPhoto) {
//         this.id = id
//         this.name= name               // main title 
//         this.image = image
//         this.blurb = blurb
//         this.prices = prices
//         this.productDims = productDims
//         this.country = country
//         this.subImage1 = subImage1
//         this.subImage2 = subImage2
//         this.isArialPhoto = isArialPhoto
//     }
// }


const mongoose = require('mongoose') 
const Schema = mongoose.Schema;

const GalleryPhotoSchema = new Schema ({
    date: Date,
    user_id: mongoose.Schema.Types.ObjectId, 
    name: String, 
    image: String, 
    blurb: String, 
    prices: Schema.Types.Mixed,
    productDims: Schema.Types.Mixed,
    country: String, 
    subImage1: String, 
    subImage2: String, 
    isArialPhoto: Boolean,

}, {
    collection: 'galleryphotos'
});

const GalleryPhotoModel = mongoose.model('galleryphoto', GalleryPhotoSchema)

module.exports =  {
    GalleryPhotoModel,
}

