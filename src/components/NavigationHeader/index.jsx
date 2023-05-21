import React, { useState, useEffect } from "react"
import styles from "@/styles/pages/Index.module.scss"
import { useRouter } from 'next/router'
import Head from 'next/head';

export function NavigationHeader() {
    const [search, setSearch] = useState('');   
    const [isLoginOrRegisterHovered, setIsLoginOrRegisterHovered] = useState(false);
    const router = useRouter();

    const handleSearch = async () => {
        if (search !== '' && search !== null && search !== undefined) {
            products = await listAllProductsBySearch(search)
            setMessageProduct(`Exibindo ${products.length} resultados para "${search}"`)
        } else {
            window.alert("Pesquise por algo!")
        }
    }

    return (
        <>
            <Head>
                <title>Página Principal</title>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png"></link>
            </Head>
            <header className={styles.headerIndex}>
                <div className={styles.logo} onClick={(e) => router.push('/')}>
                </div>
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
                        onMouseLeave={() => setIsLoginOrRegisterHovered(false)}>
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
                    </li>
                </ul>
            </header>
        </>
    )
}