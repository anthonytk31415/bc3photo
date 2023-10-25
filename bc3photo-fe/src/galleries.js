import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { Container, Row, Col } from 'react-bootstrap'

/// write a fetch request to get the 

function GalleryPhotoThumb({galleryphoto_id, name, image}) {
    return (
        <Link to={`/galleries/${galleryphoto_id}`}>
            <div className="imgBlogContainer"> 
                <img src={image} alt="uploaded" />
                <p className="imgBlogCaption" >{name}</p>
            </div>
        </Link>
    )
}

function GalleryPhotoThumbs({galleriesData}) {
    let thumbs = []
    for (let i = 0; i < galleriesData.length; i ++) {
        let data = galleriesData[i]
        thumbs.push(<GalleryPhotoThumb image={data.image} name={data.name} galleryphoto_id={data._id}/>)
    }
    return (
        <div>
            {thumbs}
        </div>
    )
}

function Galleries() {
    const [galleriesData, setGalleriesData] = useState([]);
    
    useEffect(() => {
        console.log('initiating load.');
        fetch('http://localhost:8080/galleries', {
            method: 'GET', 
            headers: {
                "Content-Type": "application/json",
            }})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                console.log('reponse received');
                return response.json();
            })
            .then(data => {
                console.log("viewing data...")
                setGalleriesData(data);
                console.log('Data received successfully!');
            })
            .catch(error => console.error(error));
    }, []);


    return (
        <div>
            this is the blog entries
            <GalleryPhotoThumbs galleriesData={galleriesData}/>
        </div>
    )
}

export {Galleries} 