import React from "react";
import { useEffect, useState } from "react";
import { listAllProducts } from "@/services/api";
import styles from "@/styles/pages/Index.module.scss"

const Home = (props) => {
    const [products, setProducts] = useState([])
    const obj = { nome: 'sifoda', link: 'https://s3.amazonaws.com/media.wikiaves.com.br/images/1602/2061018_6590cfefff108e8b17f5fa805c297a56.jpg'}

    useEffect(() => {
        let fetchData = async () => {
            const data = await listAllProducts()
            setProducts(data)
        }
        fetchData()
    }, [])

    return (
        <div className={styles.container}>
            <header>
                <img 
                    src="./../../images/logo.png" 
                    alt="logotipo conquest"
                    className={styles.logo}
                />
                <div>
                    <input type="text" placeholder="Procure por um produto!"/>
                    <button>🔎</button>
                    <button>🛒</button>
                </div>
                <div>
                    <span>Logado/deslogado logar</span>
                    <img 
                        src="./../images/usericon.png" 
                        alt="" 
                        className={styles.logarlogo} 
                    />
                </div>
            </header>
            <main>
                {console.log(products[products.length -1])}
                {products.map(product => {
                    return(
                        <div className={styles.produto} onClick={(e) => window.alert('teste!')}>
                            <img src={ product.productImages != null ? product.productImages.length > 0 ? product.productImages[0].imageBase64 : './../images/noimage.png' : undefined} alt={product.productDescription} />
                            <span><strong>Nome: </strong>{product.productName}</span> <br/>
                            <span><strong>Review: </strong>{product.productReview}</span> <br/>
                            <span><strong>Valor: </strong>{product.productValue.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
                        </div>
                    )
                })}
            </main>
        </div>
    )
}

export default Home;