import { useState } from "react";
import Image from "next/image";
import SVGLoog from '../../assets/logo.svg'
import styles from "./styles.module.scss"
import { useRouter } from 'next/router'

export function Header({handleSearch, setSearch}) {
  const router = useRouter()
  const [isLoginOrRegisterHovered, setIsLoginOrRegisterHovered] = useState(false);

  return (
    <header className={styles.headerIndex}>
      <Image src={SVGLoog} alt="Logo" />
      <ul>
        <li>
          <div className={styles.input}>
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquise por algo:"
            />
            <button onClick={(e) => handleSearch()}>🔎</button>
          </div>
        </li>
        <li>
          <div className={styles.cart}>
            <button>🛒Carrinho</button>
          </div>
        </li>
        <li
          onMouseEnter={() => setIsLoginOrRegisterHovered(true)}
          onMouseLeave={() => setIsLoginOrRegisterHovered(false)}
        >
          <div
            className={styles.login}>
            Login/Cadastrar
          </div>

          {isLoginOrRegisterHovered &&
            (<div className={styles.popup}>
              <button onClick={() => { router.push("/loginCustomer") }}>Logar</button>
              <button onClick={() => { router.push("/customer/customerCad") }}>Criar Conta</button>
            </div>)
          }
        </li>
      </ul>
    </header>
  )
}