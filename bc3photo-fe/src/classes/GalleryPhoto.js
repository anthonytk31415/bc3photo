class GalleryPhoto {
    constructor(id, name, image, blurb, prices, productDims, country, subImage1, subImage2, isArialPhoto) {
        this.id = id
        this.name= name               // main title 
        this.image = image
        this.blurb = blurb
        this.prices = prices
        this.productDims = productDims
        this.country = country
        this.subImage1 = subImage1
        this.subImage2 = subImage2
        this.isArialPhoto = isArialPhoto
    }
}


// create reviews to map to the gallaryphoto

export {GalleryPhoto}