import { useEffect, useState } from 'react'
import styles from '@/styles/pages/user/List.module.scss'
import { UserItem } from '@/components/pages/user/UserItem'
import { ApiUserList } from '@/services/api'
import { useRouter } from "next/router"
import { Button } from '@/components/Button'

export default function List() {
  const [userList, setUserList] = useState([])
  const router = useRouter()

  const fetchUserList = async () => {
    try {
      const listaUsuario = await ApiUserList()
      setUserList(listaUsuario)
      console.log("teste lista de usuário", listaUsuario)
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
            <button onClick={()=>router.push("userCad")} type="button" className={styles.userCad}>
              +
            </button>
          </div>
        </div>
        {userList.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </>
  )
}