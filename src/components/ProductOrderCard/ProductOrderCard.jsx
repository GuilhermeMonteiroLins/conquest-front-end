import React from "react";
import styles from './ProductOrderCard.module.scss'

const ProductOrderCard = (props) => {
    return (
        <article className={styles.article}>
            <div className={styles.productInfo}>
                <p>Caloi Aro 42</p>
                <p>R$ 340.43 (un.)</p>
                <p>Quantidade: 3</p>
                <p>Valor Total: R$ {340.43 * 3}</p>
            </div>
            <div className={styles.productImage}>
                <img src="https://http2.mlstatic.com/D_NQ_NP_823658-MLB52555948236_112022-O.webp" alt="Imagem do Produto"/>
            </div>
        </article>
    );
}

export default ProductOrderCard;
