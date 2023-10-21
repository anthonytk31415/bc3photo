import React, {useContext} from 'react';
import {CreateBlogPostContext} from '../../providers/BlogPostProvider';



function BlogPostBodyContainer({blogPostBody}) {
    
    // based on the blogPostBody items, we'll build arr with 
    // the rendered react components for display
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

function BlogPostContainer({title, cover, blogPostBody}) {

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
            <BlogPostBodyContainer blogPostBody={blogPostBody}/>
        </div>
    )
}


function BlogPostPreviewContainer() {
    const {title, cover, blogPostBody} =useContext(CreateBlogPostContext);

    return (
        <BlogPostContainer title={title} cover ={cover} blogPostBody={blogPostBody}/>
    )
}


export {BlogPostContainer, BlogPostPreviewContainer}
