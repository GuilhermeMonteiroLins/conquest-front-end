import { useEffect, useState } from 'react'
import styles from '@/styles/pages/user/List.module.scss'
import { ApiUserList } from '@/services/api'
import { UserItem } from '@/components/pages/user/UserItem'
import { apiUserList } from '@/services/api'
import { useRouter } from "next/router"
import { Button } from '@/components/Button'
import Table from '@/components/Table'

export default function List() {
  const router = useRouter()

  const fetchUserList = async () => {
    try {
      const listaUsuario = await apiUserList()
      setUserList(listaUsuario)
      console.log(userList)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserList()
  }, [])

  return (
    <>
      <div className={styles.tittle}>
        <span>Seja bem-vindo {JSON.parse(localStorage.getItem("userData")).email}</span>
        <Button className={styles.back} onClick={() => router.push("/home")} type="button">Voltar</Button>
        <h1>Lista de usuários</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.topbar}>
          <div className={styles.cad}>
            <input type="text" placeholder="Busca de usuario" />
            <button onClick={() => router.push("userCad")} type="button" className={styles.userCad}>
              +
            </button>
          </div>
        </div>
        <Table
          render={"usuario"}
        />
      </div>
    </>
  )
}