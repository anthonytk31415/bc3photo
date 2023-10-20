import React, { useState } from 'react';

// fetch request to upload 

import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

function ImageTest() {
    const [img, setImg] = useState(null);
    const [imagePath, setImagePath] = useState('');
    const [image, setImage] = useState('');

    // upload locally the image upload
    function handleImageUpload(e) {
        const selectedImage = e.target.files[0];

        if (selectedImage) {        
        const reader = new FileReader();
    
        reader.onload = (e) => {
            const base64ImageData = e.target.result;    // Contains the base64-encoded image data
            setImg(base64ImageData);
            console.log('Image encoded as base64');
        };

        reader.readAsDataURL(selectedImage);            // Read the image file as data URL (base64)
        }
    };

    function handleImagePathChange(e) {
        setImagePath(e.target.value); 
    }

    // submit the image to the backend
    // this will pass the token; and will do verification on the
    // backend
    function submitImage() { 
        return new Promise( (resolve, reject) => {
            const token = localStorage.getItem('token');
            console.log('retrieving token...', token)
            if (!token) {
                console.log('bad token');
                resolve(false);
            }
            let newImage = {
                name: img.name, 
                file: img
            }
            fetch('http://localhost:8080/image', {
                method: 'POST', 
                headers: {
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newImage)
            })
            .then((res) => {
                res.json()
                console.log("transfer process complete");
                resolve(res);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    })};

    function submitImageForDownload() {
        fetch('http://localhost:8080/image', {
            method: 'GET', 
            headers: {
                "Content-Type": "application/json", 
            },
        })
        .then(response => {
            return response.json()
        })
        .then(data  => {
            setImage(data);
            console.log(data)
        })
        .catch((error) => {
            console.error(error);
        })};


    return (
        <div> 
            <Form>
                <Stack direction="horizontal" gap={2}>
                    <label className="formLabel">Upload Image</label>
                    <Form.Control type="file" accept="image/*" onChange={handleImageUpload}/>
                </Stack>
                {img && <Button onClick={submitImage}> Submit Image </Button>}
            </Form>

            <Form>
                <Stack direction="horizontal" gap={2}>
                    <label className="formLabel">Image Path</label>
                    <Form.Control type="text" value={imagePath} required onChange={handleImagePathChange}/>
                </Stack>
                {imagePath && <Button onClick={submitImageForDownload}> Download image </Button>}
            </Form>
            {image && <img src={image} alt="blah" />}
        </div>
    )
}


export { ImageTest }