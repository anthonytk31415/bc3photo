import React from 'react';
import Form from 'react-bootstrap/Form';


function FormControlText({ category, size, input, handleChange}){
    return (
        <Form.Control 
        type="text"
        value={input}
        onChange={(e) => {
            let newVal = e.target.value; 
            handleChange(category, size, newVal);
        }}
        />
    )
}

export {FormControlText}