import { Button } from '@/components/Button'
import styles from '@/styles/pages/Home.module.scss'
import { useRouter } from "next/router"
import { useEffect, useState } from 'react'
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import toastifyConfig from '@/util/ToastifyConfigs/toastifyConfig';

export default function Home() {

  const [userInfo, setUserInfo] = useState();
  const router = useRouter()

  const getOut = (router) => {
    localStorage.clear()
    router.push("/login")
  }

  const handlePermissonAdm = () => {
    if (userInfo?.userGroup == 2) {
      Toastify(toastifyConfig.Denied).showToast()
    } else {
      router.push("user/userList")
    }
  }

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem('userData')))
  }, [])

  return (
    <>
      <span className={styles.saudation}>Seja bem-vindo {userInfo?.userEmail}</span>
      <div className={styles.Button}>
        <Button onClick={() => getOut(router)} type="button" color={"goback"}>Sair</Button>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <img className={styles.logo} src="images/logo.png" alt="Logo-conquest" />
        </div>
        <div className={styles.data}>
          <div className={styles.componentProduct}>
            <img className={styles.btnProduct} src="images/iconProduct.png" onClick={() => router.push("product/prodList")} />
            <p className={styles.paragraph}>Produto</p>
          </div>
          <div className={styles.componentUser}>
            <img className={styles.btnUser} src="images/iconUser.png" onClick={() => handlePermissonAdm()} />
            <p className={styles.paragraph}>Usuários</p>
          </div>
          <div className={styles.componentUser}>
            <img className={styles.btnOrder} src="images/listaPedidos.png" onClick={() => router.push("customer/orders")} />
            <p className={styles.paragraph}>Pedidos</p>
          </div>
        </div>
      </div>
    </>
  )
}