import React, { useState } from 'react'
import styles from '@/styles/pages/user/UserCad.module.scss'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import validarCPF from '@/util/validarCPF'
import validarEmail from '@/util/validarEmail'
import validarNome from '@/util/validarNome'
import { useRouter } from 'next/router'
import { apiUserCad } from '@/services/api'

export default function UserCad() {
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [senha2, setSenha2] = useState('')
  const [grupo, setGrupo] = useState('')
  const router = useRouter()

  const checaNome = (nome) => {
    if (validarNome(nome) == false) {
      alert("Nome Inválido! Verifique se o nome não contém caracteres especiais")
      setNome('')
      return false
    } else {
      setNome(nome)
      return true
    }
  }

  const checaCPF = (cpf) => {
    if (validarCPF(cpf) == false) {
      alert("CPF Inválido! Verifique a formatação do CPF")
      setCpf('')
      return false
    } else {
      setCpf(cpf)
      return true
    }
  }

  const checaEmail = (email) => {
    if (validarEmail(email) == false) {
      alert("E-mail Inválido! Verifique se você informou um e-mail válido")
      setEmail('')
      return false
    } else {
      setEmail(email)
      return true
    }
  }

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

  const checaBotao = () => {
    const radioButtons = document.querySelectorAll('input[name="grupo"]');
    let isRadioSelected = false;

    radioButtons.forEach(function (button) {
      if (button.checked) {
        isRadioSelected = true;
      }
    });

    if (!isRadioSelected) {
      alert("Nenhum botão de opção selecionado!!!");
    }
    return isRadioSelected
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validadeFields()){
      return alert("Campo inválido.")
    }
    let data = apiUserCad(nome, cpf, email, senha, grupo)
    console.log(data)
    alert("Usuário Cadastrado!")
  }

  const validadeFields = () => {
    let isValidCPF = checaCPF(cpf)
    let isValidNome = checaNome(nome)
    let isValidEmail = checaEmail(email)
    let isValidSenha = checaSenha(senha, senha2)
    let idCheckedBotao = checaBotao()

    if (isValidNome && isValidCPF && isValidEmail && isValidSenha && idCheckedBotao) { 
      return true
    }
    return false
  }
  return (
    <div className={styles.container}>
      <div className={styles.tittle}>
        <button onClick={() => router.push("/user/userList")} type="button">Voltar</button>
        <h1>Cadastrar usuário</h1>
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
          />
          <Input
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            type="text"
            placeholder="Digite seu CPF"
            label="CPF:"
            maxLength="11"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Digite seu e-mail"
            label="E-mail:"
            maxLength="40"
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
          <div className={styles.grupo}>
            <span>Grupo: </span>
            <div className={styles.radio1}>
              <input
                onChange={() => setGrupo(1)}
                type="radio"
                name="grupo"
                value={1}
              />
              &nbsp;Administrador
            </div>
            <div className={styles.radio2}>
              <input
                onChange={() => setGrupo(2)}
                type="radio"
                name="grupo"
                value={2}
              />
              &nbsp;Estoquista
            </div>
          </div>
          <div className={styles.submit}>
            <Button type="reset" color="cancel" onClick={() => {
              setNome('');
              setCpf('');
              setEmail('');
              setSenha('');
              setSenha2('');
              setGrupo('');
            }}>
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
