import React from 'react'

function Button({
    children,
    type  = 'button',
    bgcolor = '',
    className = '',
    ...props
}) {
    
    return (
        <button type={type} className={`px-2 py-2 cursor-pointer ${bgcolor} ${className}`} {...props} > 
        {children} </button>
    )
}

export default Button
