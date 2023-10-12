import React, {useContext} from 'react';
import {CreateBlogPostContext} from '../../providers/BlogPostProvider';



function BlogPostBodyContainer() {
    
    const {blogPostBody} = useContext(CreateBlogPostContext);

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
                element = <p className="txtBlog">{msg}</p>
                break
            case 'imageSet':
                element =   <div className="imgBlogContainer"> 
                                <img src={msg.file} alt="uploaded" />
                                <p className="imgBlogCaption" >{msg.caption}</p>
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

function BlogPostContainer() {
    const {title, cover} =useContext(CreateBlogPostContext);
    return (
        <div className="blogPostContainer"> 
            <h1 className="blogTitle"> {title}</h1>
            {title && 
                <div> 
                    <div className="gap1"/>
                    <div className="titleBar"/> 
                    <div className="gap1"/> 
                </div>}
            <div className="imgBlogContainer"> 
            {cover && <img src={cover} alt="cover-placeholder" className="imgBlog"/>}
            </div>
            <BlogPostBodyContainer />
        </div>
    )
}

export {BlogPostContainer}
