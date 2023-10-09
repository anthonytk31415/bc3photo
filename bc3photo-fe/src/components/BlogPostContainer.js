import React, {useContext} from 'react';
import {CreateBlogPostContext} from './BlogPostElements'



function BlogPostBodyContainer({blogPostBody}) {
    
    // const {blogPostBody} = useContext(CreateBlogPostContext);

    let arr = []
    for (let i = 0; i < blogPostBody.length; i ++) {
        let element; 
        let entry = blogPostBody[i]
        let msg = entry.data
        switch (entry.type) {
            case 'h3': 
                element = <h3>{msg}</h3>
                break
            case 'h4': 
                element = <h4>{msg}</h4>
                break
            case 'text': 
                element = <p>{msg}</p>
                break
            case 'imageSet':
                element =   <div> 
                                <img src={msg.file} alt="uploaded" />
                                <p>{msg.caption}</p>
                            </div>
                break

            default: 
                element = null
        }

        if (element) {
            arr.push(element);
        }
            
    }
    return (
        <div> 
            {arr}
        </div>
    )
}


// BlogPostContainer will be rendered for the preview and 
// for the blog post. 

function BlogPostContainer({title, cover, blogPostBody }) {

    return (
        <div className="blogPostContainer"> 
            {cover && <img src={cover} alt="cover-placeholder" />}
            <h1> {title}</h1>
        

            <BlogPostBodyContainer blogPostBody={blogPostBody}/>
        </div>
    )
}

export {BlogPostContainer}
