import React from "react";
import { useEffect, useState } from "react";
import styles from "@/styles/pages/product/ProdDetail.module.scss"
import { useRouter } from 'next/router'
import { NavigationHeader } from "@/components/NavigationHeader";
import Carrossel from "../../components/Carrossel/Carrossel";
import { apiProdVisualize } from '@/services/api';

export default function ProdDetail(props) {
    const [product, setProduct] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        getProduct().then(data => {
            setProduct(data);
            setLoading(false);
        })
    }, [id]);

    const getProduct = async () => await apiProdVisualize(id);

    const addProductOnCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let isAdded = false;

        if (cart === null) {
            let newCart = [
                {
                    productId: product.productId,
                    imageBase64: product.productImages[0].imageBase64,
                    productName: product.productName,
                    productPrice: Number(product.productValue),
                    productQtd: 1
                }
            ];

            localStorage.setItem('cart', JSON.stringify(newCart));
            return;
        }

        cart.map(data => {
            if (data.productId === product.productId) {
                return isAdded = true;
            }
        });

        if (isAdded) {
            alert("Produto já incluso no carrinho");
            return;
        }

        let newCart = cart;
        newCart.push({
            productId: product.productId,
            imageBase64: product.productImages[0].imageBase64,
            productName: product.productName,
            productPrice: product.productValue,
            productQtd: 1
        });

        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(newCart));
        router.push("/");
    }

    return (
        <div className={styles.container}>
            <NavigationHeader />
            {
                !isLoading ?
                    <>
                        <section>
                            {!isLoading ?
                                <>
                                    <div className={styles.carrossel}>
                                        <Carrossel
                                            width={500}
                                            height={450}
                                            slides={product.productImages}
                                        />
                                    </div>

                                    <aside>
                                        <h1><strong>{product?.productName}</strong></h1>
                                        <p id={styles.val}><strong>{product?.productValue?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
                                        <p><strong>Review: {product?.productReview}/5.0</strong></p>
                                        <p id={styles.desc}><strong>Descrição:</strong> <br /> {product?.productDescription}</p>
                                        <div className={styles.btnBuyToCart}>
                                            <button className={styles.btnBuy}> Comprar </button>
                                            <button className={styles.btnCart} onClick={() => addProductOnCart()} > Adicionar ao carrinho </button>
                                        </div>
                                    </aside>
                                </> : <></>
                            }

                        </section>
                    </> : <></>
            }

        </div>
    );
};