import { useState } from 'react'


import styles from '@/styles/pages/Login.module.scss'
import { apiCustomerLogin } from '@/services/api'
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
   
    let authenticate = await apiCustomerLogin(email, senha)
    if (authenticate.customerId == 0) {
      Toastify(toastifyConfig.error).showToast()
    } else {
      Toastify(toastifyConfig.login).showToast()
      authenticate.userEmail = email;
      authenticate.userSenha = senha;
     
      localStorage.setItem("userData", JSON.stringify(authenticate))
      console.log(JSON.parse(localStorage.getItem("userData")))
      router.push("/")
    }

  }

  const handleAddCustomer = async (e) => {
    router.push("/customer/customerCad")
  }
  return (
    <div className={styles.container}>
      <div className={styles.logo} style={{cursor:"pointer"}}onClick={() => router.push("/")}>
        <img src="images/logo.png" alt="logotipo conquest" />
      </div>
      <form className={styles.form}>
        <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        type="email" 
        placeholder="e-mail" />
        <input 
        value={senha} 
        onChange={(e) => setSenha(e.target.value)} 
        type="password" 
        placeholder="senha" />
        <button type="button" onClick={handleSubmit}>Acessar</button>
        <button type="button" onClick={handleAddCustomer}>Cadastrar</button>
      </form>
    </div>
  )
}