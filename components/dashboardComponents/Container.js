import React from 'react'

const Container = ({ className, children }) => {
    return (
        <div className={`md:ml-5 mt-3 ${className ?? className}`}>{children}</div>
    )
}

export default Container