import React from "react";

/// here's where we'll house what the gallaryPhoto looks like
// use this to generate gallary photo and the preview
function GalleryPhotoElement({name, image, blurb, subImage1, subImage2, country, prices, productDims, isArialPhoto}) {
    const sizes = ['small', 'medium', 'large']
    let basePricesElements = []
    let framedPricesElements = []
    let printSizeElements = []
    let paperSizeElements = []
    let framedSizeElements = []

    // can probably refactor all of this to make it more tidy
    for (let j = 0; j < sizes.length; j ++) {
        let size = sizes[j] 
        basePricesElements.push(<p>{prices['basePrices'][size]}</p>)
        framedPricesElements.push(<p>{prices['framedPrices'][size]}</p>)
        printSizeElements.push(<p>{productDims['printSize'][size]}</p>)
        paperSizeElements.push(<p>{productDims['paperSize'][size]}</p>)
        framedSizeElements.push(<p>{productDims['framedSize'][size]}</p>)
    }


    return (
        <div className="blogPostContainer">
            <h1 className="blogTitle">{name} </h1>
            <img src={image} alt="mainImage"/>
            <p className="txtBlog">{blurb} </p> 
            <img src={subImage1} alt="subImage1"/>
            <img src={subImage2} alt="subImage2"/>
            <p>Country: {country} (later we'll add this as a tag) </p>
            <p>Is Arial Photo: {isArialPhoto ? "yes" : "no"} </p>
            <p>All prints are signed and printed on premium Epson photographic paper.</p>
            <h3>Prices</h3>
            <h4> Print Only Prices: (Placeholder)</h4>
            {basePricesElements}
            <h4> Framed Print Prices: (Placeholder) </h4>
            {framedPricesElements}
            <h3> Product Dimensions:</h3>
            <h4> Print Size Dimensions</h4>
            {printSizeElements}
            <h4> Paper Size Dimensions</h4>
            {paperSizeElements}
            <h4> Framed Size Dimensions</h4>
            {framedSizeElements}

            <h4> Special Requests:</h4>
            <p>All images are also available printed on Metal, Acrylic, and Canvas. If you have a specific size in mind, all images are available in custom sizes and frames as well.</p>
            <p>For detailed descriptions of each medium, please visit the printing page. Details on the available framing options can be found on the display page.</p>
            <p>Please contact us for quotes on any special requests.</p>
        </div>
    )
}


export { GalleryPhotoElement }