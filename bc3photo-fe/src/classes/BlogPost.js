
/// we'll use this to submit to the backend
class BlogPost {
    constructor(authorId, title, date, blogBody, cover, coverName) {
        this.authorId = authorId
        this.title = title 
        this.date = date
        this.blogBody = blogBody
        this.cover = cover
        this.coverName = coverName
    }

}

// we'll use this to house all elements of the blogpost content. 
// will contain an array of elements that will be rendered
// based on the type in that order in the array
class BlogPostBody {
    constructor() {
        this.contents = []
    }

    add(x){
        this.contents.push(x)
    }

    switch(idx1, idx2) {
        if (idx1 < 0 || idx1 >= this.contents.length || idx2 < 0 || idx2 >= this.contents.length){
            console.log("invalid indexes.")
            return 
        }
        const temp = this.contents[idx1]
        this.contents[idx1] = this.contents[idx2]
        this.contents[idx2] = temp
        return 
    }
}


// these are elemnts of the blogpostbody
// types include: text, h3, h4, imageSet
// for text, h3, h4: data = string.
// for imageSet, data = imageSetData

class BlogPostBodyElement {
    constructor (type, data) {
        this.type = type
        this.data = data
    }
}



// this is the "data" that's use din the BlogPostBodyElement for type = ImageSet
// remove "filename; this is redundant; make it fully defined by the file itself"
class ImageSetData {
    constructor(filename, caption, file=null) {
        this.filename = filename
        this.caption = caption
        this.file = file
    }
}

export {BlogPost, BlogPostBody, BlogPostBodyElement, ImageSetData}