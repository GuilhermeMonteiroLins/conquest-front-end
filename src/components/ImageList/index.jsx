import React from 'react';
import styles from './Styles.module.scss'

const ImageList = ({ images, onRemoveImage }) => {
    return (
        <div className={styles.imageList}>
            {images.map((image, index) => (
                <div className={styles.containerImg} key={index}>
                    <img src={image.imageBase64} alt={`Imagem ${index}`} />
                    <button onClick={() => onRemoveImage(index)}>X</button>
                </div>
            ))}
        </div>
    );
};

export default ImageList;