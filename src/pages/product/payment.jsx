import React, { useState, useEffect, use } from "react";
import { useRouter } from 'next/router'
import { NavigationHeader } from "@/components/NavigationHeader";
import { Input } from '@/components/Input'
import styles from "@/styles/pages/product/ProdPayment.module.scss";
import generateDateStringPattern from '@/services/date';
import { orderAdd } from "@/services/api";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import toastifyConfig from '@/util/ToastifyConfigs/toastifyConfig';

function Payment() {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState({});
    const [isCard, setCard] = useState(true);
    const [formValues, setFormValues] = useState({});

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')));
        setAddress(JSON.parse(localStorage.getItem('address')))
        setLoading(false);
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
            "freightValue": 200,
            "formPayment": isCard ? 'CARTÃO' : "BOLETO",
            "dateOrder": generateDateStringPattern(),
            "addressId": address.addressId,
            "itemOrder": items
        }

        const response = await orderAdd(json);

        if (response) {
            alert("Número do pedido gerado com sucesso: " + response);
            Toastify(toastifyConfig.login).showToast();
            localStorage.removeItem('cart');
            localStorage.removeItem('address');
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

        return 200 + total;
    }

    return (
        <>
            <NavigationHeader />
            {
                !isLoading ?
                    <>

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
                    </> : <></>
            }
        </>


    )

}

export default Payment;