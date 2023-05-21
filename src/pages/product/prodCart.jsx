import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "@/styles/pages/product/ProdCart.module.scss"

const ProdCart = () => {
    const [products, setProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        setProducts(JSON.parse(localStorage.getItem("cart")))
        // products.map(prod => setTotalPrice(Number(totalPrice + (prod.productPrice * prod.quantity))))
        calculateValue()
    }, [])

    const calculateValue = () => {
        for (let prod of products) {
            let total = Number(prod.productPrice * prod.quantity);
            console.log(total)
            setTotalPrice(totalPrice + total)
        }
    }

    const handleQuantity = (currentId, currentIndex, currentQuantity) => {
        if (currentQuantity > 0) {
            let prod = products.filter(current => currentId === current.productId)[0];
            let newList = products;
            console.log(currentQuantity)
            newList.splice(currentIndex, 1);
            prod.quantity = currentQuantity;
            newList.push(prod);
            setProducts(newList);
            localStorage.removeItem("cart");
            localStorage.setItem("cart", JSON.stringify(products));
            window.location.reload(true)
        } else {
            alert("abaixo de 0 num pode! :(")
        }
    }

    const removeProduct = (currentId, currentIndex) => {
        let prod = products.filter(current => currentId === current.productId)[0];
        let newList = products;
        newList.splice(currentIndex)

    }

    return (
        <>
            <Head>
                <title>Carrinho</title>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png"></link>
            </Head>
            <main className={styles.main}>
                <h1>Carrinho</h1>
                <div className={styles.products}>

                    {products.map((prod, index) => {
                        return (
                            <div className={styles.product}>
                                <div className={styles.imagemProduto}>
                                    <img src={prod.imageBase64} alt="" />
                                </div>
                                <div className={styles.productInfo}>
                                    {prod.productName}
                                    <div>
                                        <button onClick={() => handleQuantity(prod.productId, index, --prod.quantity)}>-</button>
                                        <span>&nbsp;{prod.quantity}&nbsp;</span>
                                        <button onClick={() => handleQuantity(prod.productId, index, ++prod.quantity)}>+</button>
                                    </div>
                                    Preço: {prod.productPrice * prod.quantity}
                                </div>
                                {/* <div className={styles.descricao}>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo impedit eaque dolorum vel saepe praesentium aliquid quia eveniet omnis voluptatibus autem tempora neque qui, magni debitis quis nesciunt minus necessitatibus.</p>
                                </div> */}
                                <div className={styles.removerProduto}>
                                    X
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
            <footer className={styles.footer}>
                <p>Frete: {200}</p>
                <p>Produtos: {totalPrice}</p>
                <p>Total: {totalPrice + 200}</p>
                <div className={styles.botoes}>
                    <button>Continuar Comprando</button>
                    <button>Pagamento</button>
                </div>
            </footer>
        </>
    );
}

export default ProdCart;