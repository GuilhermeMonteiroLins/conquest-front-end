/* eslint-disable react/jsx-boolean-value */
import { useState } from 'react'
import styles from '@/styles/pages/user/UserCad.module.scss'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { useRouter } from 'next/router'

export default function UserAlt() {

  const router = useRouter()

  console.log(JSON.parse(router.query.user))

  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const [senha2, setSenha2] = useState('')
  const [grupo, setGrupo] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      nome,
      cpf,
      senha,
      grupo,
      status,
    }

    console.log(JSON.stringify(payload))
    // mandar dados para o back
  }

  const handleLogin = () =>
    senha === senha2 ? alert('esta correto') : alert('não é possível')

  return (
    <div className={styles.container}>
      <div className={styles.tittle}>
        <h1>Alterar usuário</h1>
      </div>
      <div className={styles.data}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            type="text"
            placeholder="Digite seu nome"
            label="Nome:"
          />
          <Input
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            type="text"
            placeholder="Digite seu CPF"
            label="CPF:"
          />
          <Input
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            type="text"
            placeholder="Digite sua senha"
            label="Senha:"
          />
          <Input
            value={senha2}
            onChange={(e) => setSenha2(e.target.value)}
            type="text"
            placeholder="Digite sua "
            label="Repita sua senha:"
          />
          <span>Grupo: </span>
          <input
            onChange={() => setGrupo(1)}
            type="radio"
            name="grupo"
            value={1}
          />
          Administrador
          <input
            onChange={() => setGrupo(2)}
            type="radio"
            name="grupo"
            value={2}
          />
          Estoquista
          <br />
          <span>Status: </span>
          <input
            onChange={() => setStatus(0)}
            type="radio"
            name="status"
            value={0}
          />
          inativo
          <input
            onChange={() => setStatus(1)}
            type="radio"
            name="status"
            value={2}
          />
          Ativo

          <div className={styles.submit}>
            <Button type="reset" color="cancel">
              Cancelar
            </Button>
            <Button type="submit" color="primary" onClick={handleLogin}>
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
