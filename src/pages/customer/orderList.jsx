import { useEffect, useState } from 'react'
import styles from '@/styles/pages/user/List.module.scss'
import { useRouter } from "next/router"
import 'rsuite/dist/rsuite.min.css'
import 'toastify-js/src/toastify.css';
import { apiOrderList } from '@/services/api'
import Pagination from '@/components/Pagination/Pagination'


export default function OrderList() {
  const [userId, setUserId] = useState()
  const [orderList, setOrderList] = useState([])
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(0)
  const ITEMS_PER_PAGE = 10
  const pages = Math.ceil(orderList.length / ITEMS_PER_PAGE)
  const startPage = currentPage * ITEMS_PER_PAGE
  const endPage = startPage + ITEMS_PER_PAGE
  const [pagedItems, setPagedItems] = useState()


  const fetchOrderList = async () => {
    try {
      const listaOrder = await apiOrderList(userId)
      setOrderList(listaOrder.reverse())
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if(orderList.length > 0){
      setPagedItems(orderList?.slice(startPage, endPage))
    }
  }, [orderList])

  useEffect(() => {
    setCurrentPage(0)
    setUserId(JSON.parse(localStorage.getItem('userData')).customerId)

    fetchOrderList()
  }, [userId])

  const handleDetailOrder = (id) => {
    localStorage.setItem("orderId", id)
    router.push("/")
  }

  return (
    <>
      <div className={styles.tittle}>
        <button onClick={() => router.push("/")} type="button">Voltar</button>
        <h1>Lista de Pedidos</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.topbar}>
        </div>

        <section className={styles.container2}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Frete</th>
                <th>Status</th>
                <th>Total</th>
                <th>Visualizar</th>
              </tr>
            </thead>
            <tbody>
              {pagedItems?.map(order => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td> {order.dateOrder} </td>
                  <td> {order.freightValue} </td>
                  <td> {order.status} </td>
                  <td> {order.amount?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </td>
                  <td><button onClick={()=> handleDetailOrder (order.orderId)}>🔎</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

        </section>
      </div>
    </>
  )
}
