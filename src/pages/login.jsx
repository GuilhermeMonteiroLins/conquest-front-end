import { useState } from 'react'
import styles from '@/styles/pages/Login.module.scss'
import { ApiUserBackLogin } from '@/services/api'
import { useRouter } from 'next/router'
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import toastifyConfig from '@/util/ToastifyConfigs/toastifyConfig';

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault()
    let autenticate = await ApiUserBackLogin(email, senha)
    console.log("Mostrando o teste", autenticate)
    if (autenticate.userId == 0) {
      Toastify(toastifyConfig.error).showToast()
    } else {
      Toastify(toastifyConfig.login).showToast()
      autenticate.userEmail = email;
      autenticate.userSenha = senha;
      localStorage.setItem("userData", JSON.stringify(autenticate))
      console.log(JSON.parse(localStorage.getItem("userData")))
      router.push("/home")
    }

  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="images/logo.png" alt="logotipo conquest" />
      </div>
      <form className={styles.form}>
        <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        type="text" 
        placeholder="e-mail" />
        <input 
        value={senha} 
        onChange={(e) => setSenha(e.target.value)} 
        type="password" 
        placeholder="senha" />
        <button type="button" onClick={handleSubmit}>Acessar</button>
      </form>
    </div>
  )
}
