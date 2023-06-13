import React from "react";
import { useState, useEffect } from "react";
import styles from '@/styles/pages/customer/customerAddAddress.module.scss';
import { apiAddAddress, apiCEPList } from "@/services/api";
import Head from "next/head";

import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import toastifyConfig from '@/util/ToastifyConfigs/toastifyConfig';

const UserAddAddress = () => {

    const [endereco, setEndereco] = useState({
        cep: '',
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: '',
        complemento: '',
        numero: 0,
        addressCustomer: false
    })

    const [userId, setUserId] = useState(0)

    const validarCep = async CEP => {
        let data = {}
        try {
            data = await apiCEPList(CEP)
            console.log(data)
            setEndereco({
                ...endereco,
                localidade: data.localidade,
                bairro: data.bairro,
                logradouro: data.logradouro,
                uf: data.uf
            })
        } catch (e) {
            console.log(e)
        }
        console.log(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await apiAddAddress(endereco, userId)

        if (Number(data.status) === 201) {
            Toastify(toastifyConfig.addressAdded).showToast()
        } else {
            Toastify(toastifyConfig.genericError).showToast()
        }

    }

    const handleClearForm = (e) => {
        e.preventDefault()
        setEndereco({
            cep: '',
            logradouro: '',
            bairro: '',
            localidade: '',
            uf: '',
            complemento: '',
            numero: 0,
            addressCustomer: false
        })
    }

    useEffect(()=> {
        setUserId(JSON.parse(localStorage.getItem('userData')).customerId)
    }, [])

    return (
        <>
            <Head>
                <title>Adicionar Endereço</title>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png"></link>
            </Head>
            <main className={styles.container}>
                <section>
                    <h1>Adicionar Endereço: </h1>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label htmlFor="cep">CEP:</label>
                        <input type="text" required pattern="[0-9]+" name="cep" value={endereco.cep} onChange={(e) => setEndereco({ ...endereco, [e.target.name]: e.target.value })} />
                        <div
                            style={{
                                width: '30px',
                                height: '30px',
                                display: 'inline',
                                margin: '10px 10px',
                                backgroundColor: '#FFF',
                                border: 'solid green 1px',
                                borderRadius: '100px',
                                textAlign: 'center'
                            }}
                            onClick={e => validarCep(endereco.cep)}
                        >
                            🔎
                        </div>

                        <label htmlFor="estado">Logradouro:</label>
                        <input type="text" required name="logradouro" value={endereco.logradouro} disabled />

                        <label htmlFor="bairro">Bairro:</label>
                        <input type="text" required name="bairro" value={endereco.bairro} disabled />

                        <label htmlFor="localidade">Localidade:</label>
                        <input type="text" required name="localidade" value={endereco.localidade} disabled />

                        <label htmlFor="uf">UF</label>
                        <input type="text" required name="uf" value={endereco.uf} disabled />

                        <label htmlFor="uf">Complemento</label>
                        <input type="text" required name="complemento" value={endereco.complemento} onChange={(e) => setEndereco({ ...endereco, [e.target.name]: e.target.value })} />

                        <label htmlFor="uf">Número</label>
                        <input type="number" min="1" required name="numero" value={endereco.numero} onChange={(e) => setEndereco({ ...endereco, [e.target.name]: Number(e.target.value) })} />

                        <div className={styles.buttons}>
                            <button className={styles.cancelButton} onClick={(e) => handleClearForm(e)}>Cancelar</button>
                            <button className={styles.sendButton}type="submit">Salvar</button>
                        </div>
                    </form>
                </section>
            </main>
        </>
    );
}

export default UserAddAddress;