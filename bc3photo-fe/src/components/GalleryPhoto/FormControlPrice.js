import React from 'react';
import Form from 'react-bootstrap/Form';




// input = prices.basePrices.large
// handleChange = handlePricesChange
// category = 'basePrices'
// size = 'small'


function FormControlPrice({ category, size, input, handleChange}){
    return (
        <Form.Control className="numberInput"
        type="number"
        value={input}
        onChange={(e) => {
            let newVal = e.target.value; 
            // if (/(\-?\d*\.?\d+)/.test(newVal)) {
            //     handleChange(category, size, newVal);
            //   }
              handleChange(category, size, newVal);
            
        }
        
        }
        />
    )
}

export {FormControlPrice}