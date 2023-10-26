import React from "react";
import { Stack } from "react-bootstrap";
//  probably need a cart provider to submit an array of orders to the cart; think about whether you want to somehow
// cache the items in storage

// need styling and then cart and provider functions 


import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

function SelectBox({name, sizes, defaultMsg}) {
    let options = []
    for (let i = 0; i < sizes.length; i++ ) {
        options.push(<option value={sizes[i]}>{sizes[i]} </option> )
    }

    return (
        <Stack direction="horizontal" gap={2}>
            <label className="formLabel">{name}</label>
            <Form.Select aria-label="Default select example">
                <option>{defaultMsg}</option>
                {options}
            </Form.Select>
        </Stack>
  );
}


function OrderMenu () {
    function buttonSubmit() {
        
    }

    return (
        <Form> 
            <p>Placeholder for Price Range</p>
            <SelectBox name={"Print Size"} sizes={["small", "medium", "large"]} defaultMsg={"Select Print Size"}/>
            <SelectBox name={"Optional Frame"} sizes={["small", "medium", "large"]} defaultMsg={"Select Frame Size"}/>
            <Button onClick={buttonSubmit}>Add To Cart</Button>
        </Form>
    )
}

export {OrderMenu}