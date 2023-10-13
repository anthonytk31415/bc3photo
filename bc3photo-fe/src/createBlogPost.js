import React, { useState } from 'react';
import { BlogPost, BlogPostBody } from './classes/BlogPost';
import {ImageSetElement, BaseElements,
        TextOrHeaderFormElement, BlogPostAddElementsMenu,
        SubmitBlogPostButton,  } from './components/BlogPostElements';

import { BlogPostProvider } from './providers/BlogPostProvider'


import {BlogPostContainer} from './components/BlogPostContainer'

// you'll need to make a context for the post elements so everytime you add element, you add that 
// to the input array and the object changes and
// then subsequently you render the array of elements 

// will have to also define how you upload photos

// need a final submit button 

// flow for submitting elements: 
// - add element button to then toggle screen. 
// - select from list a h3/h4/text/imageset
// - once selected, the input comes. a button "submit" also shows upload. 
// - "submitted" will trigger a render
// - when submitted, that piece will get added to the Array. 

// do i need to input somethign where it'll submit the thing into the object?


function CreateBlogPostMenu() {



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



export { CreateBlogPostMenu }