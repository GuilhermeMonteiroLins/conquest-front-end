import React from "react";
import { useEffect, useState } from "react";
import styles from "@/styles/pages/product/ProdDetail.module.scss"
import Head from 'next/head';
import { useRouter } from 'next/router'

import Carrossel from "../../components/Carrossel/Carrossel"
import DefaultImage from "@/components/DefaultImage";

export default function ProdDetail() {
    const [currentProduct, setCurrentProduct] = useState({});

    const router = useRouter();

    useEffect(() => {
        setCurrentProduct(JSON.parse(localStorage.getItem("currentProduct")))
        console.log("testing", currentProduct)
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Detalhe do Produto</title>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png"></link>
            </Head>
            <header className={styles.headerIndex}>
                <div className={styles.logo} onClick={(e) => router.push("/")}>
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
            <section>
                <div className={styles.carrossel}>
                    <Carrossel
                        width={320}
                        height={450}
                        slides={JSON.parse(localStorage.getItem("currentProduct")).productImages}
                    />
                </div>

                <DefaultImage
                    image={JSON.parse(localStorage.getItem("currentProduct")).productImages[0]}
                />

                <aside>
                    <h1><strong>{currentProduct?.productName}</strong></h1>
                    {console.log(currentProduct)}
                    <p id={styles.val}><strong>{currentProduct?.productValue?.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</strong></p>
                    <p><strong>Review: {currentProduct?.productReview}/5.0</strong></p>
                    <p id={styles.desc}><strong>Descrição:</strong> <br/> {currentProduct?.productDescription}</p>
                </aside>
            </section>
        </div>
    );
};