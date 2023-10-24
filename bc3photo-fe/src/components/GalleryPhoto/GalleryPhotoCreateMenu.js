import React, {useContext} from 'react';
import { CreateGalleryPhotoContext } from '../../providers/CreateGalleryPhotoProvider';

import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { GalleryPhoto } from './GalleryPhoto';
import Table from 'react-bootstrap/Table';
import { FormControlPrice } from './FormControlPrice';
import { FormControlText } from './FormControlText';

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
        setImage, handleImageUpload,
        blurb, handleBlurbChange, 
        prices, setPrices, handlePricesChange,
        productDims, setProductDims, handleProductDimsChange,
        country, 
        isArialPhoto, handleCountryChange, 

        handleIsArialPhoto,
        subImage1, setSubImage1, 
        subImage2, setSubImage2,

    } = useContext(CreateGalleryPhotoContext);

    var countries = require("i18n-iso-countries");
    countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
    const countryList = Object.values(countries.getNames("en", {select: "official"}))
    
    return (
        <div> 
            <p> Create your elements: {name} </p>
            <Form className="formInput">

                {/* Section for Title, Upload Cover, Blurb */}
                <Form.Group className="mb-1" controlId="formMainElements">
                    <Stack direction="horizontal" gap={2}>
                        <label className="formLabel">Title</label>
                        <Form.Control type="text" value={name} required onChange={handleNameChange}/>
                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                        <label className="formLabel">Upload Cover</label>
                        <Form.Control type="file" accept="image/*" onChange={(e)=> handleImageUpload(e, setImage)}/>
                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                        <label className="formLabel">Blurb</label>
                        <Form.Control type="textInput" value={blurb} rows={3} required onChange={handleBlurbChange} as="textarea"/>
                    </Stack>

                    {/* Table for Base Prices, Framed Prices */}
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Values</th>
                                <th>Small</th>
                                <th>Medium</th>
                                <th>Large</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Base Prices ($)</td>
                                <td>
                                    <FormControlPrice 
                                        category = {'basePrices'}
                                        size={'small'}
                                        input={prices.basePrices.small}
                                        handleChange={handlePricesChange}
                                    />
                                </td>
                                <td>
                                    <FormControlPrice 
                                        category = {'basePrices'}
                                        size={'medium'}
                                        input={prices.basePrices.medium}
                                        handleChange={handlePricesChange}
                                    />
                                </td>
                                <td>
                                    <FormControlPrice 
                                        category = {'basePrices'}
                                        size={'large'}
                                        input={prices.basePrices.large}
                                        handleChange={handlePricesChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                            <td>Framed Prices ($)</td>
                                <td>
                                    <FormControlPrice 
                                        category = {'framedPrices'}
                                        size={'small'}
                                        input={prices.framedPrices.small}
                                        handleChange={handlePricesChange}
                                    />
                                </td>
                                <td>
                                    <FormControlPrice 
                                        category = {'framedPrices'}
                                        size={'medium'}
                                        input={prices.framedPrices.medium}
                                        handleChange={handlePricesChange}
                                    />
                                </td>
                                <td>
                                    <FormControlPrice 
                                        category = {'framedPrices'}
                                        size={'large'}
                                        input={prices.framedPrices.large}
                                        handleChange={handlePricesChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Print Size</td>
                                <td>
                                    <FormControlText 
                                        category = {'printSize'}
                                        size={'small'}
                                        input={productDims.printSize.small}
                                        handleChange={handleProductDimsChange}
                                    />
                                </td>
                                <td>
                                    <FormControlText
                                        category = {'printSize'}
                                        size={'medium'}
                                        input={productDims.printSize.medium}
                                        handleChange={handleProductDimsChange}
                                    />
                                </td>
                                <td>
                                    <FormControlText 
                                        category = {'printSize'}
                                        size={'large'}
                                        input={productDims.printSize.large}
                                        handleChange={handleProductDimsChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Paper Size</td>
                                <td>
                                    <FormControlText 
                                        category = {'paperSize'}
                                        size={'small'}
                                        input={productDims.paperSize.small}
                                        handleChange={handleProductDimsChange}
                                    />
                                </td>
                                <td>
                                    <FormControlText
                                        category = {'paperSize'}
                                        size={'medium'}
                                        input={productDims.paperSize.medium}
                                        handleChange={handleProductDimsChange}
                                    />
                                </td>
                                <td>
                                    <FormControlText 
                                        category = {'paperSize'}
                                        size={'large'}
                                        input={productDims.paperSize.large}
                                        handleChange={handleProductDimsChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Framed Size</td>
                                <td>
                                    <FormControlText 
                                        category = {'framedSize'}
                                        size={'small'}
                                        input={productDims.framedSize.small}
                                        handleChange={handleProductDimsChange}
                                    />
                                </td>
                                <td>
                                    <FormControlText
                                        category = {'framedSize'}
                                        size={'medium'}
                                        input={productDims.framedSize.medium}
                                        handleChange={handleProductDimsChange}
                                    />
                                </td>
                                <td>
                                    <FormControlText 
                                        category = {'framedSize'}
                                        size={'large'}
                                        input={productDims.framedSize.large}
                                        handleChange={handleProductDimsChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </Table>


                    {/* PLACEHOLDER for Product Dimenions  */}

                   {/* Country Selection  */}
                    <Stack direction="horizontal" gap={2}>
                        <label className="formLabel">Country</label>
                        <Form.Select value={country} required onChange={handleCountryChange}>
                            <option>Select Country</option>
                            {countryList.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </Form.Select>
                    </Stack>

                    <Stack direction="horizontal" gap={2}>
                        <label className="formLabel">Upload Sub-Image 1</label>
                        <Form.Control type="file" accept="image/*" onChange={(e)=> handleImageUpload(e, setSubImage1)}/>
                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                        <label className="formLabel">Sub-Image 2</label>
                        <Form.Control type="file" accept="image/*" onChange={(e)=> handleImageUpload(e, setSubImage2)}/>
                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                        <label className="formLabel">Is Arial Photo?</label>
                        <Form.Check type="switch" value={isArialPhoto} onChange={handleIsArialPhoto}/>
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
        name, image, blurb, 
        subImage1, subImage2, 
        country, prices, productDims, isArialPhoto, handleIsArialPhoto, 
    } = useContext(CreateGalleryPhotoContext);
    return (
        <div>
            <GalleryPhotoBaseElements/>
            <GalleryPhotoSubmitButton/>
            <div> 
                <p>Preview here</p>
                {name && image && blurb &&
                <GalleryPhoto 
                    name={name} image={image} blurb={blurb} 
                    subImage1={subImage1} subImage2={subImage2}
                    country={country} prices={prices}
                    productDims={productDims}
                    isArialPhoto={isArialPhoto}
                    handleIsArialPhoto = {handleIsArialPhoto}
                    />
                }
            </div>
        </div>
    )
}


export {GalleryPhotoCreateMenu}