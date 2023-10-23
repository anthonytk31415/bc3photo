import React, {useContext} from 'react';
import { CreateGalleryPhotoContext } from '../../providers/CreateGalleryPhotoProvider';

import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { GalleryPhoto } from './GalleryPhoto';
import Table from 'react-bootstrap/Table';
/// preview

// menu for form elements

// for these variables: 
// country, framedprices, prices, productDims 
// build an interface so you can either select prior 
// built ones, or add new ones via the backend.
// 



function GalleryPhotoBaseElements(){

    const {
        name, handleNameChange, 
        handleImageUpload,
        blurb, handleBlurbChange, 
        prices, setPrices, 
    } = useContext(CreateGalleryPhotoContext);


    const handlePricesChange = (category, size, newValue) => {
        setPrices((prevValues) => ({
          ...prevValues,
          [category]: {
            ...prevValues[category],
            [size]: newValue,
          },
        }));
      };


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
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>Values</th>
                            <th>Small</th>
                            <th>Mediume</th>
                            <th>Large</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Base Prices</td>
                            <td>
                                <Form.Control
                                type="text"
                                value={parseFloat(prices.basePrices.large).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 2, // To display exactly two decimal places
                                  })}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    if (/^\d+(\.\d+)?$/.test(newValue)) {
                                      handlePricesChange('basePrices', 'small', newValue);
                                    }
                                }}
                                />
                            </td>
                            <td>
                                <Form.Control
                                type="text"
                                value={parseFloat(prices.basePrices.medium).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 2, // To display exactly two decimal places
                                  })}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    if (/^\d+(\.\d+)?$/.test(newValue)) {
                                      handlePricesChange('basePrices', 'medium', newValue);
                                    }
                                }}
                                />
                            </td>
                            <td>
                                <Form.Control
                                type="text"
                                value={parseFloat(prices.basePrices.large).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 2, // To display exactly two decimal places
                                  })}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    if (/^\d+(\.\d+)?$/.test(newValue)) {
                                      handlePricesChange('basePrices', 'large', newValue);
                                    }
                                }}
                                />
                            </td>
                            </tr>
                            <tr>
                            <td>Framed Prices</td>
                            <td>
                                <Form.Control
                                type="text"
                                value={parseFloat(prices.framedPrices.small).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 2, // To display exactly two decimal places
                                  })}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    if (/^\d+(\.\d+)?$/.test(newValue)) {
                                      handlePricesChange('framedPrices', 'small', newValue);
                                    }
                                }}
                                />
                            </td>
                            <td>
                                <Form.Control
                                type="text"
                                value={parseFloat(prices.framedPrices.medium).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 2, // To display exactly two decimal places
                                  })}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    if (/^\d+(\.\d+)?$/.test(newValue)) {
                                      handlePricesChange('framedPrices', 'medium', newValue);
                                    }
                                }}
                                />
                            </td>
                            <td>
                                <Form.Control
                                type="text"
                                value={parseFloat(prices.framedPrices.large).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 2, // To display exactly two decimal places
                                  })}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    if (/^\d+(\.\d+)?$/.test(newValue)) {
                                      handlePricesChange('framedPrices', 'large', newValue);
                                    }
                                }}
                                />
                            </td>
                            </tr>
                        </tbody>
                    </Table>
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