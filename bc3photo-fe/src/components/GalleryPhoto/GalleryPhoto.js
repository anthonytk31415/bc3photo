/// here's where we'll house what the gallaryPhoto looks like
// use this to generate gallary photo and the preview

// will need menu: 
// - print size 
// - optional frame
// - descriptions of print and frame
// - reviews


import React from "react";

function GalleryPhoto({name, image, blurb}) {

    return (
        <div className="blogPostContainer">
            <h1 className="blogTitle">{name} </h1>
            <img src={image} alt="mainImage"/>
            <p className="txtBlog">{blurb} </p> 

        </div>
    )
}


export { GalleryPhoto }