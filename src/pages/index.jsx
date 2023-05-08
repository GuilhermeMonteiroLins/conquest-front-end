import React from "react";
import { useEffect, useState } from "react";
import Head from 'next/head';
import { listAllProducts, listAllProductsBySearch } from "@/services/api";
import styles from "@/styles/pages/Index.module.scss"
import { useRouter } from 'next/router'

const Home = (props) => {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const [messageProduct, setMessageProduct] = useState('')
    const [isLoginOrRegisterHovered, setIsLoginOrRegisterHovered] = useState(false);
    const router = useRouter()

    const handleSearch = async () => {
        if(search !== '' && search !== null && search !== undefined) {
            const products = await listAllProductsBySearch(search)
            setMessageProduct(`Exibindo ${products.length} resultados para "${search}"`)
            setProducts(products)
        } else {
            window.alert("Pesquise por algo!")
        }
    }

    const handleGoToProductDetail = (product) => {
        localStorage.setItem("currentProduct", JSON.stringify(product))
        router.push("/product/prodDetail")
    }

    const handleLoginOrRegisterHover = (e) => {
        setIsLoginOrRegisterHovered(e.type === "mouseover");
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
            <Head>
                <title>Página Principal</title>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png"></link>
            </Head>
            <header className={styles.headerIndex}>
                <div className={styles.logo} onClick={(e) => router.reload()}>
                </div>
                <ul>
                    <li>
                        <div className={styles.input}>
                            <input
                                type="text"
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Pesquise por algo:"
                            />
                            <button onClick={(e) => handleSearch()}>🔎</button>
                        </div>
                    </li>
                    <li>
                        <div className={styles.cart}>
                            <button>🛒Carrinho</button>
                        </div>
                    </li>
                    <li>
                        <div className={styles.login}>
                            Login/Cadastrar
                        </div>
                    </li>
                </ul>
            </header>
            <span style={{color: '#FFF'}}>{messageProduct}</span>
            <main>
                {products.map(product => {
                    return(
                        <div key={product.id} className={styles.produto} onClick={(e) => handleGoToProductDetail(product)}>
                            <img src={ product.productImages != null ? product.productImages.length > 0 ? product.productImages[0].imageBase64 : './../images/noimage.png' : './../images/noimage.png'} alt={product.productDescription} />
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