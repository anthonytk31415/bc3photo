import React, {useEffect, useContext} from 'react';
import { BaseElements,
        BlogPostAddElementsMenu,
        SubmitBlogPostButton  } from './components/BlogPost/BlogPostElements';

import { BlogPostPreviewContainer } from './components/BlogPost/BlogPostContainer'
        
import { CreateBlogPostProvider } from './providers/CreateBlogPostProvider'
import { UserLoggedInContext } from './providers/UserLoggedInContextProvider';
import { handleVerification } from './fetchRequests/verifyToken';

function CreateBlogPost() {

    const {isAuthenticated, setIsAuthenticated} = useContext(UserLoggedInContext)
    /// flow: verify auth, if true: then render page; if not, redirect to "need to auth"
    useEffect(() => {
        console.log('initiating CreateBlogPost page load.');
            handleVerification(setIsAuthenticated)
    });


    return (
        <div>
            {isAuthenticated && (<CreateBlogPostProvider>
                <div className="BlogPostProviderContainer"> 
                    <BaseElements/>
                    <BlogPostAddElementsMenu/>
                    <SubmitBlogPostButton/>

                </div> 
                <p> preview your content: (PLACEHOLDER) </p> 
                <BlogPostPreviewContainer />
            </CreateBlogPostProvider>
        )}
        </div>
    )
}



export { CreateBlogPost }