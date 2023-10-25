import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { GalleryPhotoElement } from './components/GalleryPhoto/GalleryPhotoElement';
import {defaultPrices, defaultProductDims} from './data/galleryPhotoDefaults';

function GalleryPhotoEntry() {


    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [blurb, setBlurb] = useState('');
    const [prices, setPrices] = useState({...defaultPrices});
    const [productDims, setProductDims] = useState({...defaultProductDims});
    const [isArialPhoto, setIsArialPhoto] = useState(false);        
    const [country, setCountry] = useState('');
    const [subImage1, setSubImage1] = useState(null);
    const [subImage2, setSubImage2] = useState(null);

    let {galleryphoto_id}  = useParams();

    useEffect( () => {
        fetch(`http://localhost:8080/galleryphoto/${galleryphoto_id}`, {
            method: 'GET', 
            headers: {"Content-Type": "application/json", 
        }})
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                setName(data.name);
                setImage(data.image);
                setBlurb(data.blurb);
                setPrices(data.prices);
                setProductDims(data.productDims);
                setIsArialPhoto(data.isArialPhoto);
                setCountry(data.country);
                setSubImage1(data.subImage1);
                setSubImage2(data.subImage2);
            })
            .catch(error => console.error(error));

    }, []);

    return (
        <div> 
            <p> this is my Gallery Photo: {galleryphoto_id} </p>
            <p>gallery photo name: {name}</p>
            {name && image && blurb && 
                <GalleryPhotoElement
                name={name} image={image} blurb={blurb} 
                subImage1={subImage1} subImage2={subImage2}
                country={country} prices={prices}
                productDims={productDims}
                isArialPhoto={isArialPhoto}
                />
            
            }               
            

        </div>
    )

}

export {GalleryPhotoEntry}