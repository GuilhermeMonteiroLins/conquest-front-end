import React from "react";

const DefaultImage = (props) => {
    
    const divStyles = {
        width: '320px',
        height: '320px',
        borderRadius: '10px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        marginRight: '10px',
        border: 'solid red 2px',
        backgroundImage: `url(${props.image.url})`
    }

    return <div style={divStyles}> </div>
}

export default DefaultImage;