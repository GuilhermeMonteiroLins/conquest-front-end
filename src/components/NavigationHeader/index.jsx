import React, { useState, useEffect } from "react"
import styles from "@/styles/pages/Index.module.scss"
import { useRouter } from 'next/router'
import Head from 'next/head';
import Dropdown from "../DropDown/DropDown";
import { listAllProductsBySearch } from "../../services/api"

export function NavigationHeader( props ) {
    const [userData, setUserData] = useState(undefined);
    const [cart, setCart] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [messageProduct, setMessageProduct] = useState();
    const router = useRouter();

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('userData')));
        setCart(JSON.parse(localStorage.getItem('cart')));
        setLoading(false);
    }, [isLoading])

    const handleSearch = async () => {
        if (search !== '' && search !== null && search !== undefined) {
            const products = await listAllProductsBySearch(search)
            if (products !== null) {
                props.setProducts(products);
                setMessageProduct(`Exibindo ${products.length} resultados para "${search}"`);
            }
        } else {
            window.alert("Pesquise por algo!")
        }
    }

    const handleLogOut = () => {
        localStorage.removeItem('userData');
        router.push('/loginCustomer');
    }

    return (
        <>
            {
                !isLoading ?
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
                                        {
                                            cart != null ?
                                                <>
                                                    <button onClick={() => router.push("/product/prodCart")}>🛒<span>Carrinho</span>({cart.length > 0 ? cart.length : 0})</button>
                                                </> : <>
                                                    <button onClick={() => router.push("/product/prodCart")}>🛒<span>Carrinho</span></button>
                                                </>
                                        }

                                    </div>
                                </li>
                                {
                                    !userData ?
                                        <>
                                            <li>
                                                <Dropdown className={styles.logOut} onClick={() =>
                                                    handleOptionClick()} options={[
                                                        { value: '/loginCustomer', label: 'Entrar' },
                                                        { value: '/customer/customerCad', label: 'Criar Conta' }
                                                    ]} />

                                            </li>
                                        </>
                                        : <>
                                            <Dropdown className={styles.logOut} onClick={() =>
                                                toggleDropdown()} options={[
                                                    { value: '/customer/customerAlt', label: 'Alterar Dados' },
                                                    { value: '/customer/orderList', label: 'Listar Pedidos' },
                                                    { value: '/customer/customerAddAddress', label: 'Novo endereço' }
                                                ]} />
                                            <button className={styles.logOut} onClick={() => handleLogOut()}> Sair </button>
                                        </>
                                }
                            </ul>
                        </header>
                    </> : <> </>
            }
        </>
    )
}