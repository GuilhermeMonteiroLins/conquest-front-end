import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from 'next/router'
import styles from "@/styles/pages/product/ProdCart.module.scss";
import { NavigationHeader } from "@/components/NavigationHeader";
import { apiCEPList, apiListAddress } from '@/services/api';

const ProdCart = () => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] = useState(null);
    const [cep, setCep] = useState('');
    const [idUser, setIdUSer] = useState(0);
    const [showInputCep, setShowInputCep] = useState(false);

    useEffect(() => {
        setProducts(JSON.parse(localStorage.getItem("cart")));
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            setIdUSer(userData.customerId)
            searchAddress(true)
        } else {
            setShowInputCep(true);
        }
        calculateValue();
    }, [isLoading])

    const calculateValue = () => {
        let total = 0;
        for (let prod of products) {
            total = total + (prod.productPrice * prod.quantity);
        }

        setTotalPrice(totalPrice + total);
        setLoading(false);
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

    const removeProduct = (currentIndex) => {
        if (products.length > 0) {
            let newList = products;
            newList.splice(currentIndex, 1);
            localStorage.removeItem("cart");
            localStorage.setItem('cart', JSON.stringify(newList));
            window.location.reload(true);
            return;
        }

        localStorage.removeItem("cart");
        window.location.reload(true);
    }

    const searchAddress = async (isAddressUser) => {
        if (isAddressUser && idUser != 0) {
            setShowInputCep(false);
            const response = await apiListAddress(idUser);

            response.json().then(json => {
                setAddress(json[0]);
                console.log(json[0]);
            })
            
        } else {
            console.log(cep);
            const response = await apiCEPList(cep);
            setAddress(response);
        }
    }

    const handleInputChange = (e) => {
        const { value } = e.target;
        setCep(value);
    }

    return (
        <>
            <NavigationHeader />
            {
                !isLoading ?
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
                                            <div className={styles.removerProduto} onClick={() => removeProduct(index)}>
                                                X
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </main>
                        <footer className={styles.footer}>
                            <span className={styles.footerPrice}>
                                <span>
                                    <p>Frete: {200}</p>
                                    <p>Produtos: {totalPrice}</p>
                                    <p>Total: {totalPrice + 200}</p>
                                </span>

                                <span>
                                    <section className={styles.linksToSearchAddress}>
                                        <a 
                                            href="#" 
                                            onClick={() => setShowInputCep(true)}
                                            style={{color: showInputCep ? 'green' : 'white'}}
                                        >
                                            Consultar novo CEP
                                        </a>
                                        <a 
                                            href="#" 
                                            onClick={() => searchAddress(true)}
                                            style={{color: showInputCep ? 'white' : 'green', marginLeft: "10px"}}
                                        >
                                            Buscar endereço já cadastrado
                                        </a>
                                    </section>
                                    {
                                        showInputCep ?
                                            <>
                                                <input name="cep" placeholder="CEP" onChange={handleInputChange} maxLength={8} />
                                                <button
                                                    style={{ width: "40px", height: "30px", marginLeft: "10px" }}
                                                    onClick={() => searchAddress(false)}
                                                >🔎</button>
                                            </> : <> </>
                                    }

                                    {
                                        address != null?
                                        <>
                                            <p style={{color: 'white'}}>Endereço: {`${address.logradouro} - ${address.cep}`}</p>
                                        </> : <> </>
                                    }

                                </span>
                            </span>

                            <div className={styles.botoes}>
                                <button onClick={() => router.push("/")}>Continuar Comprando</button>
                                <button onClick={() => router.push("/product/payment")}>Pagamento</button>
                            </div>
                        </footer>
                    </> : <></>
            }
        </>
    );
}

export default ProdCart;