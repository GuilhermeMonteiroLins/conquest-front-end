import { useEffect, useState } from 'react'
import styles from '@/styles/pages/user/List.module.scss'
import { apiProdList, apiProdSearch, apiProdStatus } from '@/services/api'
import { useRouter } from "next/router"
import { Toggle } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import Toastifyconf from '@/util/ToastifyConfigs/toastifyConfig';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import Pagination from '@/components/Pagination/Pagination'

export default function List() {
  const [prodList, setProdList] = useState([])
  const [prod, setProd] = useState('')
  const router = useRouter()


  //Paginação
  const [currentPage, setCurrentPage] = useState(0)
  const ITEMS_PER_PAGE = 10
  const pages = Math.ceil(prodList.length / ITEMS_PER_PAGE)
  const startPage = currentPage * ITEMS_PER_PAGE
  const endPage = startPage + ITEMS_PER_PAGE
  const pagedItems = prodList.slice(startPage, endPage)


  const fetchProdList = async () => {
    try {
      const listaProd = await apiProdList()
      setProdList(listaProd)
      console.log(prodList)
    } catch (error) {
      console.log(error)
    }
  }

  const handleToggle = async (productId, productStatus) => {
    const response = await apiProdStatus(productId, productStatus)
    if (response == 202) {
      await fetchProdList()
    }
  }


  const handleProdSearch = async () => {
    try {
      const prodSearchList = await apiProdSearch(prod)
      if (prodSearchList.length > 0) {
        setProdList(prodSearchList)
      } else {
        Toastify(Toastifyconf.error).showToast();
      }
      console.log(prodList)
    } catch (error) {
      Toastify(Toastifyconf.error).showToast();
    }
  }

  const handleAlteration = (prod, e) => {
    e.preventDefault()
    localStorage.setItem("idProduto", JSON.stringify(prod.productId))

    Toastify({
      text: "Indo para a próxima tela.",
      duration: 1000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      stopOnFocus: true,
    }).showToast();
    router.push('/product/prodAlt')
  }

  useEffect(() => {
    setCurrentPage(0)
    fetchProdList()
  }, [])

  return (
    <>
      <div className={styles.tittle}>
        <button onClick={() => router.push("/home")} type="button">Voltar</button>
        <h1>Lista de produtos</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.topbar}>
          <div className={styles.cad}>
            <input type="text"
              placeholder="Buscar produto por nome:"
              onChange={(e) => setProd(e.target.value)} />
            <button onClick={() => handleProdSearch()} type="button" className={styles.userCad}>
              🔍
            </button>
            <button onClick={() => router.push("prodCad")} type="button" className={styles.userCad}>
              +
            </button>
          </div>
        </div>

        <section className={styles.container2}>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                {console.log(pagedItems)}
                <th>Nome</th>
                <th>Estoque</th>
                <th>Preço</th>
                <th><strong>Status</strong></th>
                <th>Alterar</th>
              </tr>
            </thead>
            <tbody>
              {pagedItems.map(prod => (
                <tr key={prod.productId}>
                  <td> {prod.productId} </td>
                  <td> {prod.productName} </td>
                  <td> {prod.productQuantity} </td>
                  <td> {prod.productValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </td>
                  <td> <Toggle onChange={() => handleToggle(prod.productId, !prod.productStatus)} checked={prod.productStatus == true} /> </td>
                  <td>
                    <button onClick={(e) => handleAlteration(prod, e)}>
                      <img className={styles.imagem} src="/images/pen.png" />
                    </button>
                  </td>
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

