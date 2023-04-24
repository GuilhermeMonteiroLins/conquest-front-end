import React from "react";

const Pagination = (props) => {

    const buttonStyles = {
        margin: '7px',
        marginTop: '20px'
    }

    const paginationStyles = {
        overflowX: 'scroll',
        whiteSpace: 'nowrap',
    }

    return (
        <div style={paginationStyles}>
            {props.pages > 1 ?
                Array.from(Array(props.pages), (item, index) => {
                    return (
                    <button 
                        style={index === props.currentPage 
                                ? { backgroundColor: '#FFF', ...buttonStyles } 
                                : { backgroundColor: '#12131B', border: 'solid #FFF 2px', color: '#FFF', ...buttonStyles }} 
                        value={index} 
                        onClick={(e) => props.setCurrentPage(Number(e.target.value))} disabled={false}>
                        {index + 1}
                        
                    </button>)
                }) : <></>
            }
        </div>
    );
}

export default Pagination