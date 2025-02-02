import React, { useId } from 'react';

const Input = ({ label, type = "text", className = "", placeholder = "enter here", ...props }, ref) => {
    const id = useId();

    return (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <input 
                type={type} 
                placeholder={placeholder} 
                id={id} 
                ref={ref} 
                {...props} 
                className={`border rounded px-2 py-1 ${className}`} 
            />
        </div>
    );
}

export default React.forwardRef(Input);
