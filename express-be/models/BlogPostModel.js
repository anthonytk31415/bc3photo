const mongoose = require('mongoose') 
const Schema = mongoose.Schema;

const ImageSetSchema = new Schema ({
    filename: String, 
    caption: String, 
    file: String
});


const BlogPostBodyElementSchema = new Schema ({
    type: String, 
    data: Schema.Types.Mixed
});

const ImageSetDataSchema = new Schema ({
    filename: String, 
    caption: String, 
    file: String
});

const BlogPostSchema = new Schema ({
    authorId: String, 
    title: String, 
    date: Date, 
    blogBody: [BlogPostBodyElementSchema], 
    cover: String

}, {
    collection: 'blogposts'
});



const BlogPostModel = mongoose.model('blogPost', BlogPostSchema)

module.exports =  {
    BlogPostModel,
}

