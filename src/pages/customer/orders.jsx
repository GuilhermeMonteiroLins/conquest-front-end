import { useEffect, useState } from 'react'
import styles from '@/styles/pages/user/List.module.scss'
import { apiOrderSearch, apiOrders } from "@/services/api";
import { useRouter } from "next/router"
import { Button } from '@/components/Button'
import Toastifyconf from '@/util/ToastifyConfigs/toastifyConfig';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import 'rsuite/dist/rsuite.min.css'

export default function List() {
    const [orderData, setOrderData] = useState([])
    const [idOrder, setIdOrder] = useState()
    const router = useRouter()

    const fetchOrderList = async () => {
        try {
            const listaPedidos = await apiOrders()
            setOrderData(listaPedidos)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchOrderList()
    }, [])

    const handleOrderSearch = async () => {
        try {
            const orderSearchList = await apiOrderSearch(idOrder)
            console.log(orderSearchList)
            if (orderSearchList.length > 0) {
                setOrderData(orderSearchList)
            } else {
                Toastify(Toastifyconf.error).showToast();
            }
        } catch (error) {
            Toastify(Toastifyconf.error).showToast();
        }
    }

    return (
        <>
            <div className={styles.tittle}>
                <Button className={styles.back} onClick={() => router.push("/home")} type="button">Voltar</Button>
                <h1>Lista de Pedidos</h1>
            </div>
            <div className={styles.container}>
                <div className={styles.topbar}>
                    <div className={styles.cad}>
                        <input type="text"
                            placeholder="Busca de usuario"
                            onChange={(e) => setIdOrder(e.target.value)} />
                        <button onClick={() => handleOrderSearch()} type="button" className={styles.userCad}>
                            🔍
                        </button>
                    </div>
                </div>
                <section className={styles.containerUserList}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Forma de Pagamento</th>
                                <th>Data</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData.map(orders => (
                                <tr key={orders.orderId}>
                                    <td> {orders.orderId} </td>
                                    <td> {orders.customerId} </td>
                                    <td> {orders.formPayment} </td>
                                    <td> {orders.dateOrder} </td>
                                    <td> {orders.amount?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </td>
                                    <td> {orders.status}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </section>
            </div >
        </>
    )
}