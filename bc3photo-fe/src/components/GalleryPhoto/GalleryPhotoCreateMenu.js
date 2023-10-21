import React, {useContext} from 'react';
import { CreateGalleryPhotoContext } from '../../providers/CreateGalleryPhotoProvider';

import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { GalleryPhoto } from './GalleryPhoto';

/// preview

// menu for form elements
function GalleryPhotoBaseElements(){

    const {
        name, handleNameChange, 
        handleImageUpload,
        blurb, handleBlurbChange, 

    } = useContext(CreateGalleryPhotoContext);

    return (
        <div> 
            <p> Create your elements: {name} </p>
            <Form className="formInput">
                <Form.Group className="mb-1" controlId="formMainElements">
                    <Stack direction="horizontal" gap={2}>
                        <label className="formLabel">Title</label>
                        <Form.Control type="text" value={name} required onChange={handleNameChange}/>
                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                        <label className="formLabel">Upload Cover</label>
                        <Form.Control type="file" accept="image/*" onChange={handleImageUpload}/>
                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                        <label className="formLabel">Blurb</label>
                        <Form.Control type="textInput" value={blurb} rows={3} required onChange={handleBlurbChange} as="textarea"/>
                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                        <label className="formLabel">Prices</label>
                        <Form.Control type="text" value={name} required onChange={()=> {}}/>
                    </Stack>
                </Form.Group>
            </Form>
        </div>
    )
}

// submit button; need to do the functionality later
function GalleryPhotoSubmitButton() {
    return (
        <div>
            <Button> Submit Gallery Photo </Button>
        </div>
    )
}


// main consolidation of components

function GalleryPhotoCreateMenu() {
    const {
        name, 
        image,
        blurb, 
    } = useContext(CreateGalleryPhotoContext);
    return (
        <div>
            <GalleryPhotoBaseElements/>
            <GalleryPhotoSubmitButton/>
            <div> 
                <p>Preview here</p>
                {name && image && blurb &&
                <GalleryPhoto name={name} image={image} blurb={blurb} />
                }
            </div>
        </div>
    )
}


export {GalleryPhotoCreateMenu}