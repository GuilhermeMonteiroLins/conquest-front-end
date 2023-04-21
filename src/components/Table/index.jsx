import React, { useState, useEffect } from "react";
import styles from "./Styles.module.scss"
import { useRouter } from "next/router";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import 'rsuite/dist/rsuite.min.css'
import { Toggle } from "rsuite";
import { apiUserStatus, apiUserList } from "@/services/api";

const Table = (props) => {

    const [userData, setUserData] = useState([])
    const router = useRouter()

    const handleToggle = async (userId, userIsActive) => {
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
    }, [])

    const handleAlteration = (user, e) => {
        e.preventDefault()
        localStorage.setItem("alterationUser", JSON.stringify(user))

        Toastify({
            text: "Indo para a próxima tela.",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            stopOnFocus: true,
        }).showToast();
        router.push('/user/userAlt')
    }

    if (props.render === "usuario") {
        return (
            <section className={styles.container}>
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
                                <td> {user.userGroup === 1 ? 'Administrador' : user.group === 2 ? 'Estoquista' : 'Inativo/Sem Grupo'} </td>
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
        )
    } else if (props.render === "produto") {
        //TODO: rederiar o produto em tabela.
    } else {
        return (
            <h1>Escolha inválida!</h1>
        )
    }
}

export default Table;