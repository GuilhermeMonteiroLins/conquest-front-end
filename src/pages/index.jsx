import React from "react";
import { useEffect, useState } from "react";
import Head from 'next/head';
import { listAllProducts, listAllProductsBySearch } from "@/services/api";
import styles from "@/styles/pages/Index.module.scss"
import { useRouter } from 'next/router'
import { NavigationHeader } from "@/components/NavigationHeader";

const Home = (props) => {
    const [messageProduct, setMessageProduct] = useState('');
    const [products, setProducts] = useState([]);
    const router = useRouter();


    const handleGoToProductDetail = (product) => {
        localStorage.setItem("currentProduct", JSON.stringify(product))
        router.push("/product/")
    }

    useEffect(() => {
        let fetchData = async () => {
            const data = await listAllProducts()
            setProducts(data)
        }
        fetchData()
    }, [])

    return (
        <div className={styles.container}>
            <NavigationHeader setProducts={setProducts} />
            <span style={{ color: '#FFF' }}>{messageProduct}</span>
            <main>
                {products != null ?
                    <>
                        {products.map(product => {
                            return (
                                <div key={product.id} className={styles.produto} onClick={() => router.push(`/product/${product.productId}`)}>
                                    <img src={product.productImages != null ? product.productImages.length > 0 ? product.productImages[0].imageBase64 : './../images/noimage.png' : './../images/noimage.png'} alt={product.productDescription} />
                                    <span><strong>Nome: </strong>{product.productName}</span> <br />
                                    <span><strong>Review: </strong>{product.productReview}</span> <br />
                                    <span><strong>Valor: </strong>{product.productValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                            )
                        })}
                    </> : <> </>
                }

            </main>
        </div>
    )
}
export default Home;