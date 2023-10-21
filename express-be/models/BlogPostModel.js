const mongoose = require('mongoose') 
const Schema = mongoose.Schema;

// data either contains:
// imageset, or text for non image sets 
const BlogPostBodyElementSchema = new Schema ({
    type: String, 
    data: Schema.Types.Mixed
});

const BlogPostSchema = new Schema ({
    authorId: mongoose.Schema.Types.ObjectId, 
    title: String, 
    date: Date,  
    blogBody: [BlogPostBodyElementSchema], 
    cover: String, 

}, {
    collection: 'blogposts'
});

const BlogPostModel = mongoose.model('blogPost', BlogPostSchema)

module.exports =  {
    BlogPostModel,
}

