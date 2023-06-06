/* eslint-disable react/jsx-boolean-value */
import { useEffect, useState } from "react";
import styles from "@/styles/pages/user/UserCad.module.scss";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import validarNome from "@/util/validarNome";
import { apiCustomerAlt, apiCustomerData } from "@/services/api";

export default function CustomerAlt() {
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [genero, setGenero] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [senha, setSenha] = useState("");
    const [senha2, setSenha2] = useState("");
    const router = useRouter();


    const fetchCustomerData = async () => {
        const customerData = await apiCustomerData(JSON.parse(localStorage.getItem('userData')).customerId)
        setId(customerData.userId)
        setNome(customerData.userName)
        setGenero(customerData.userGender)
        setDataNascimento(customerData.userBirthDate)
        setSenha(customerData.userPassword)
        setSenha2(customerData.userPassword)

        console.log(customerData)
    }

    useEffect(() => {
        fetchCustomerData()
    }, [])

    const checaNome = (nome) => {
        if (validarNome(nome) == false) {
            alert(
                "Nome Inválido! Verifique se o nome não contém caracteres especiais"
            );
            setNome("");
            return false;
        } else {
            setNome(nome);
            return true;
        }
    };

    const checaSenha = (senha, senha2) => {
        if (senha !== senha2) {
            alert("Senha Inválida!!!")
            setSenha('')
            setSenha2('')
            return false
        } else {
            return true
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validadeFields()) {
            return alert("Campo inválido.");
        }
        let data = apiCustomerAlt(id, nome, genero, dataNascimento, senha);
        
        alert("Usuário alterado!");

        router.push("/")
    };


    const validadeFields = () => {
        let isValidNome = checaNome(nome);
        let isValidSenha = checaSenha(senha, senha2);

        if (
            isValidNome &&
            isValidSenha
        ) {
            return true;
        }
        return false;
    };

    return (
        <>
            <button onClick={() => router.push("/")} type="button">
                Voltar
            </button>
            <div className={styles.container}>
                <div className={styles.tittle}>
                    <h1>Alterar dados usuário</h1>
                </div>
                <div className={styles.data}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <Input
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            type="text"
                            placeholder="Digite seu nome"
                            label="Nome:"
                            maxLength="100"
                            required
                        />
                        <Input
                            value={genero}
                            onChange={(e) => setGenero(e.target.value)}
                            type="text"
                            placeholder="Digite seu Genero"
                            label="Genero:"
                            maxLength="11"
                        />
                        <Input
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                            type="date"
                            placeholder="Digite sua data de nascimento"
                            label="Data de Nascimento:"
                            maxLength="11"
                        />
                        <Input
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            type="password"
                            placeholder="Digite sua senha"
                            label="Senha:"
                        />
                        <Input
                            value={senha2}
                            onChange={(e) => setSenha2(e.target.value)}
                            type="password"
                            placeholder="Digite sua senha"
                            label="Repita sua senha:"
                        />
                        <div className={styles.submit}>
                            <Button
                                type="reset"
                                color="cancel"
                                onClick={() => router.push("/")}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" color="primary">
                                Salvar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
