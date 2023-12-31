import React, {useEffect, useContext} from 'react';
// import { BaseElements,
//         BlogPostAddElementsMenu,
//         SubmitBlogPostButton  } from './components/BlogPost/BlogPostElements';
// import { BlogPostPreviewContainer } from './components/BlogPost/BlogPostContainer' 
// import { BlogPostProvider } from './providers/BlogPostProvider'

import { UserLoggedInContext } from './providers/UserLoggedInContextProvider';
import { handleVerification } from './fetchRequests/verifyToken';
import { GalleryPhotoCreateMenu } from './components/GalleryPhoto/GalleryPhotoCreateMenu';
import { CreateGalleryPhotoProvider } from './providers/CreateGalleryPhotoProvider';


function CreateGalleryPhoto() {

    const {isAuthenticated, setIsAuthenticated} = useContext(UserLoggedInContext)

    /// flow: verify auth, if true: then render page; if not, redirect to "need to auth"
    useEffect(() => {
        console.log('initiating CreateGalleryPhoto page load.');
            handleVerification(setIsAuthenticated)
    });

    return (
        <div>
            <CreateGalleryPhotoProvider>
            {isAuthenticated && (
                <div>
                    <p> Create Gallery Photo</p> 
                    <GalleryPhotoCreateMenu/>
                </div> 

            )}
            </CreateGalleryPhotoProvider>
        </div>
    )
}


export { CreateGalleryPhoto }