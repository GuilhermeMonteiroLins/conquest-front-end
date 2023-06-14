import React from "react";
import { useEffect, useState } from "react";
import Head from "next/head";
import styles from '@/styles/pages/customer/orderDetail.module.scss'
import ProductOrderCard from "@/components/ProductOrderCard/ProductOrderCard";
import { apiCustomerOrderSearch } from "@/services/api";


const orderDetail = (props) => {

    const [currentOrder, setCurrentOrder] = useState({})

    // useEffect(async ()=> {
    //     let response = await apiCustomerOrderSearch(1)
    //     setCurrentOrder(response)
    // }, [])

    return (
        <>
            <Head>
                <title>Detalhe da Ordem</title>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png"></link>
            </Head>

            <div className={styles.main}>
                
                <div className={styles.produtos}>
                    <h1>Detalhe do Pedido</h1>
                    <ProductOrderCard
                    />
                    
                    <ProductOrderCard
                    />
                    
                    <ProductOrderCard
                    />
                    
                    <ProductOrderCard
                    />
                    
                    <ProductOrderCard
                    />
                    
                    <ProductOrderCard
                    />
                </div>
                <footer>
                    <div>
                        <p>Frete: 203.3</p>
                        <p>Preço total: 32.3</p>
                        <p>Status: entregue</p>
                    </div>              
                    
                    <div>
                        <p>CEP: 23232332</p>
                        <p>Estado: SP</p>
                        <p>Cidade: São Paulo</p>
                        <p>Número: 122</p>
                    </div>

                </footer>
            </div>
        </>
    )
}

export default orderDetail;