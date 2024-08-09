import React from 'react'

function Button({className = "" , children , ...props}) {
  return (
    <>
        <button className = {`text-white py-3 font-semibold px-6 ring-2 ring-gray-100 ring-opacity-20 rounded-full text-nowrap ${className}`} {...props}>
            {children}
        </button>
    </>
  )
}

export default Button