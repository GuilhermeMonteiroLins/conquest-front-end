/*
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
   
    let autenticate = await apiCustomerLogin(email, senha)
    if (autenticate.userId == 0) {
      Toastify(toastifyConfig.error).showToast()
    } else {
      Toastify(toastifyConfig.login).showToast()
      autenticate.userEmail = email;
      autenticate.userSenha = senha;
     
      localStorage.setItem("userData", JSON.stringify(autenticate))
      console.log(JSON.parse(localStorage.getItem("userData")))
      router.push("/")
    }

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
*/
import { useState } from 'react';
import React from "react";
import styles from "@/styles/pages/LoginCustomer.module.scss";
import { useRouter } from 'next/router';

const LoginCustomer = () => {
  const [isLoginOrRegisterHovered, setIsLoginOrRegisterHovered] = useState(false);
  const router = useRouter()

  return (
    <div className={styles.container}>
      <header className={styles.headerIndex}>
        <div className={styles.logo} onClick={(e) => router.reload()}>
        </div>
        <div className={styles.input}>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquise por algo"
          />
          <button onClick={(e) => handleSearch()}>🔎</button>
        </div>
        <div className={styles.cart}>
          <button>🛒Carrinho</button>
        </div>
        {/* onMouseEnter={() => setIsLoginOrRegisterHovered(true)}
        onMouseLeave={() => setIsLoginOrRegisterHovered(false)} */}
        <div
          className={styles.login}>
          Login/Cadastrar
        </div>

        {isLoginOrRegisterHovered &&
          (<div className="popup">
            <button onClick={(e) => { router.push("/loginCustomer") }}> Logar </button>
            <button onClick={(e) => { router.push("/customer/customerCad") }}> Criar Conta </button>
          </div>)
        }
      </header>

      <main>
        <div className={styles.telaLogin}>
          <h1>LOGIN</h1>
          <div className={styles.userIcon}>
            <img src="/images/usericon.png" alt="Icone de usuário" />
          </div>
          <div className={styles.userInput}><input type="text" placeholder="Digite o seu e-mail" /></div>
          <div className={styles.userInput}><input type="text" placeholder="Digite a sua senha" /></div>
          <div className={styles.userButtons}>
            <button className={styles.cancelar}><strong>Cancelar</strong></button>
            <button className={styles.entrar}><strong>Entrar</strong></button>
          </div>
        </div>
      </main>
    </div>
  )
}
export default LoginCustomer;