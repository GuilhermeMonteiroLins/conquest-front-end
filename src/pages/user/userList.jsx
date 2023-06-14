import { useEffect, useState } from 'react'
import styles from '@/styles/pages/user/List.module.scss'
import { apiUserStatus, apiUserList, apiUserSearch } from "@/services/api";
import { useRouter } from "next/router"
import { Button } from '@/components/Button'
import { Toggle } from 'rsuite'
import Toastifyconf from '@/util/ToastifyConfigs/toastifyConfig';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import 'rsuite/dist/rsuite.min.css'

export default function List() {
  const [userData, setUserData] = useState([])
  const [nome, setNome] = useState('')
  const [userInfo, setUserInfo] = useState()
  const router = useRouter()

  const handleToggle = async (userId, userIsActive) => {
    console.log("Meu user Info: " , userInfo)
    if (userInfo.userId === userId) {
      alert("Você não pode alterar o seu próprio usuário!!!")
      return;
    }
    const response = await apiUserStatus(userId, userIsActive)
    if (response == 202) {
      await fetchUserList()
    }
  }

  const fetchUserList = async () => {
    try {
      const listaUsuario = await apiUserList()
      setUserData(listaUsuario)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserList()
    setUserInfo(JSON.parse(localStorage.getItem('userData')))
  }, [])

  const handleUserSearch = async () => {
    try {
      const userSearchList = await apiUserSearch(nome)
      if (userSearchList.length > 0) {
        setUserData(userSearchList)
      } else {
        Toastify(Toastifyconf.error).showToast();
      }

      console.log(userData)
    } catch (error) {
      Toastify(Toastifyconf.error).showToast();
    }
  }

  const handleAlteration = (user, e) => {
    e.preventDefault()
    localStorage.setItem("idUsuario", JSON.stringify(user.userId))

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
    router.push('/user/userAlt')
  }

  return (
    <>
      <div className={styles.tittle}>
        <span>Seja bem-vindo {userInfo?.userEmail} </span>
        <Button className={styles.back} onClick={() => router.push("/home")} type="button">Voltar</Button>
        <h1>Lista de usuários</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.topbar}>
          <div className={styles.cad}>
            <input type="text"
              placeholder="Busca de usuario"
              onChange={(e) => setNome(e.target.value)} />
            <button onClick={() => handleUserSearch()} type="button" className={styles.userCad}>
              🔍
            </button>
            
            <button onClick={() => router.push("userCad")} type="button" className={styles.userCad}>
              +
            </button>
          </div>
        </div>
        <section className={styles.containerUserList}>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Grupo</th>
                <th>Status</th>
                <th>Alterar</th>
              </tr>
            </thead>
            <tbody>
              {userData.map(user => (
                <tr key={user.userCpf}>
                  <td> {user.userName} </td>
                  <td> {user.userCpf} </td>
                  <td> {user.userEmail} </td>
                  <td> {user.userGroup === 1 ? 'Administrador' : user.group === 2 ? 'Inativo/Sem Grupo' : 'Estoquista'} </td>
                  <td> <Toggle onChange={() => handleToggle(user.userId, !user.userStatus)} checked={user.userStatus == true} /> </td>
                  <td>
                    <button onClick={(e) => handleAlteration(user, e)}>
                      <img className={styles.imagem} src="/images/pen.png" />
                    </button>
                  </td>
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