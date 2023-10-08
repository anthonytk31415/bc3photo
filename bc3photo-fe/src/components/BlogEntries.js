import React from "react";


function BlogEntries({blogData}) {

    let elements = []
    for (let i = 0; i < blogData.length; i ++) {
        elements.push(
            <div> 
                <p>{blogData[i].title}</p>
                <p>hey yo</p>
            </div>
        )
    }

    return (
        <div>
            {elements}
        </div>
    )
}

export {BlogEntries}