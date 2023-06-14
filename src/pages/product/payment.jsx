import React, { useState, useEffect, use } from "react";
import { useRouter } from 'next/router'
import { NavigationHeader } from "@/components/NavigationHeader";
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import styles from "@/styles/pages/product/ProdPayment.module.scss";
import generateDateStringPattern from '@/services/date';
import { orderAdd } from "@/services/api";
import { apiListAddress } from '@/services/api';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import toastifyConfig from '@/util/ToastifyConfigs/toastifyConfig';
import Modaladdress from "../../components/ModalAddress/ModalAddress";

function Payment() {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState({});
    const [freight, setFreight] = useState({});
    const [isCard, setCard] = useState(true);
    const [formValues, setFormValues] = useState({});

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')))
        setAddress(JSON.parse(localStorage.getItem('address')))
        setFreight(JSON.parse(localStorage.getItem('freight')))
        setLoading(false);
        calculateValue();
    }, [isLoading]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const items = [];

        for (let c of cart) {
            items.push(
                {
                    productQtd: c.productQtd,
                    productId: c.productId
                }
            );
        }

        const json = {
            "customerId": address.userId,
            "amount": calculateValue(),
            "freightValue": freight,
            "formPayment": isCard ? 'CARTÃO' : "BOLETO",
            "dateOrder": generateDateStringPattern(),
            "addressId": address.addressId,
            "itemOrder": items
        }

        const response = await orderAdd(json);

        if (response) {
            alert("Número do Pedido: " + response + " / total:" + calculateValue().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
            Toastify(toastifyConfig.login).showToast();
            localStorage.removeItem('cart');
            localStorage.removeItem('address');
            localStorage.removeItem('freight');
            router.push('/');
            return;
        }

        Toastify(toastifyConfig.errorInPayment).showToast()
    }

    const calculateValue = () => {
        let total = 0;
        for (let prod of cart) {
            total = total + (prod.productPrice * prod.productQtd);
        }

        return total + freight;
    };


    const removeProduct = (currentIndex) => {
        if (cart.length > 0) {
            let newList = cart;
            newList.splice(currentIndex, 1);
            localStorage.removeItem("cart");
            localStorage.setItem('cart', JSON.stringify(newList));
            window.location.reload(true);
            return;
        }

        localStorage.removeItem("cart");
        window.location.reload(true);
    }

    const handleQuantity = (currentId, currentIndex, currentQuantity) => {
        if (currentQuantity > 0) {
            let prod = cart.filter(current => currentId === current.productId)[0];
            let newList = cart;
            newList.splice(currentIndex, 1);
            prod.productQtd = currentQuantity;
            newList.push(prod);
            setCart(newList);
            localStorage.removeItem("cart");
            localStorage.setItem("cart", JSON.stringify(cart));
            window.location.reload(true)
        } else {
            alert("abaixo de 0 num pode! :(")
        }
    }

    return (
        <>
            <NavigationHeader />
            {
                !isLoading ?
                    <>
                        <main className={styles.main}>
                            <h1>Detalhe do Pedido</h1>
                            <div className={styles.products}>

                                {cart?.map((prod, index) => {
                                    return (
                                        <div className={styles.product}>
                                            <div className={styles.imagemProduto}>
                                                <img src={prod.imageBase64} alt="" />
                                            </div>
                                            <div className={styles.productInfo}>
                                                {prod.productName}
                                                <div>
                                                    <button onClick={() => handleQuantity(prod.productId, index, --prod.productQtd)}>-</button>
                                                    <span>&nbsp;{prod.productQtd}&nbsp;</span>
                                                    <button onClick={() => handleQuantity(prod.productId, index, ++prod.productQtd)}>+</button>
                                                </div>
                                                Preço: {prod.productPrice * prod.productQtd}
                                            </div>
                                            <div className={styles.removerProduto} onClick={() => removeProduct(index)}>
                                                X
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </main>
                        <form onSubmit={handleSubmit} className={styles.formPayment}>
                            <label>
                                Deseja comprar no boleto?
                                <Input type={"checkbox"} onClick={() => setCard(!isCard)}></Input>
                            </label>
                            {isCard ?
                                <>
                                    <h3>Adicione os dados do cartão:</h3>
                                    <Input
                                        onChange={() => handleInputChange}
                                        placeholder={"Nome completo"}
                                        name={"name"}
                                        value={formValues.name}
                                        maxLength={160}
                                        required
                                    ></Input>
                                    <Input
                                        onChange={() => handleInputChange}
                                        placeholder={"Número do cartão"}
                                        name={"cardNumber"}
                                        value={formValues.cardNumber}
                                        maxLength={16}
                                        required
                                    ></Input>
                                    <section className={styles.inputGroup}>
                                        <label>
                                            CVV
                                            <Input
                                                onChange={() => handleInputChange}
                                                placeholder={"CVV"}
                                                name={"cvv"}
                                                value={formValues.cvv}
                                                maxLength={3}
                                                required
                                            ></Input>
                                        </label>

                                        <label>
                                            Data de vencimento:
                                            <Input
                                                onChange={() => handleInputChange}
                                                type={"date"}
                                                placeholder={"Data de vencimento"}
                                                name={"date"}
                                                value={formValues.date}
                                                required
                                            ></Input>
                                        </label>
                                    </section>

                                    <Input
                                        onChange={() => handleInputChange}
                                        placeholder={"Número de parcelas"}
                                        type={"number"}
                                        name={"installments"}
                                        value={formValues.installments}
                                        step="1"
                                        max={12}
                                        required
                                    ></Input>
                                </>
                                : <>
                                    <h3>Adicione os dados do boleto:</h3>
                                    <Input onChange={() => handleInputChange} placeholder={"Nome completo"} required></Input>
                                </>
                            }
                            <button>Concluir pagamento</button>
                        </form>
                        <footer className={styles.footer}>
                            <span className={styles.footerPrice}>
                                <span>
                                    <p>Frete: {freight.toFixed(2)}</p>
                                    <p>Total: {calculateValue().toFixed(2)}</p>
                                </span>
                                <p> Endereço: {address?.logradouro} - {address?.numero} / {address?.localidade} </p>
                            </span>
                        </footer>
                    </> : <></>
            }
        </>


    )

}

export default Payment;