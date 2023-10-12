import React from 'react';


// used for text and passwords
function CustomFormInput({
    name, 
    type, 
    value,
    onChangeFn,
    onBlurFn,
    onFocusFn,
    placeholder,
    pattern = null,
    className, 
    showPassword = true

    }) { 


    return (
        <div className="inputRect"> 
            <p className="inputTag">{type}</p>
            <input 
                name={name}
                value={value}
                type={showPassword ? "text" : "password"}
                onChange={onChangeFn}
                onBlur={onBlurFn}
                onFocus={onFocusFn}
                placeholder={placeholder}
                pattern={pattern}
                required
                className={className}
            /> 
        </div>
    )
}   

export { CustomFormInput }