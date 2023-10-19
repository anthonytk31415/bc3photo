import React, { useState } from 'react';


// fetch request to upload 

import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';



function ImageTest() {
    const [img, setImg] = useState(null)


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

    // submit the image to the backend
    function submitImage(e) {
        let newImage = {
            image: img
        }

        fetch('http://localhost:8080/blogpost', {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newImage)
        })
            .then((response) => {
                response.json()
                console.log('transfer complete')
            })
            .catch((error) => console.error(error));
    };

    return (
        <div> 
            <Form>
                <Stack direction="horizontal" gap={2}>
                    <label className="formLabel">Upload Image</label>
                    <Form.Control type="file" accept="image/*" onChange={handleImageUpload}/>
                </Stack>
                {img && <Button onClick={submitImage}> Submit Image </Button>
                    }
            </Form>
        </div>
    )
}


export { ImageTest }