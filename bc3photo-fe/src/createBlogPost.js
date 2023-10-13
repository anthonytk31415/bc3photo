import React from 'react';
import { BaseElements,
        BlogPostAddElementsMenu,
        SubmitBlogPostButton  } from './components/BlogPost/BlogPostElements';

import { BlogPostProvider } from './providers/BlogPostProvider'
import  { BlogPostContainer } from './components/BlogPost/BlogPostContainer'

function CreateBlogPost() {
    return (
        <BlogPostProvider>
            <div className="BlogPostProviderContainer"> 
                <BaseElements/>
                <BlogPostAddElementsMenu/>
                <SubmitBlogPostButton/>

            </div> 
            <p> preview your content: (PLACEHOLDER) </p> 
            <BlogPostContainer />
        </BlogPostProvider>
    )
}



export { CreateBlogPost }