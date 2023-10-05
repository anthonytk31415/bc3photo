class BlogPost {
    constructor(authorId, title, date, blogBody, cover) {
        this.authorId = authorId
        this.title = title 
        this.date = date
        this.blogBody = blogBody
        this.cover = cover
    }

}
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


// types include: text, h3, h4, imageSet
class BlogPostBodyElement {
    constructor (type, data) {
        this.type = type
        this.data = data
    }
}

class imageSet {
    constructor(filename, caption) {
        this.filename = filename
        this.caption = caption
    }
}

export {BlogPost, BlogPostBody, BlogPostBodyElement, imageSet}