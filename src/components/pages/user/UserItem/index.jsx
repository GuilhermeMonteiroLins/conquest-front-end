import { useState, useEffect } from 'react'
import { Toggle } from 'rsuite'
import styles from './UserItem.module.scss'
import 'rsuite/dist/rsuite.min.css'
import { useRouter } from 'next/router'
import { ApiUserStatus } from '@/services/api'

export function UserItem({ user }) {
  const [toggleIsActive, setToggleIsActive] = useState(user.status)
  const router = useRouter()

  useEffect(() => {
    const updateStatus = async () => {
      const response = await ApiUserStatus(user.cpf, toggleIsActive)
      setToggleIsActive(response.statusUser)
    }
    updateStatus()
  }, [toggleIsActive, user.cpf])

  const handleToggle = () => {
    setToggleIsActive(!toggleIsActive)
  }

  return (
    <div className={styles.userCard}>
      <div className={styles.userInfo}>
        <div>
          <p>Nome:</p>
          <span>{user.nameUser}</span>
        </div>
        <div>
          <p>e-mail:</p>
          <span>{user.email}</span>
        </div>
        <div>
          <p>Status:</p>
          <span>{user.status ? 'Ativo' : 'inativo'}</span>
        </div>
        <div>
          <p>Grupo:</p>
          <span>{user.group}</span>
        </div>
      </div>
      <div className={styles.userActions}>
        <Toggle
          checked={toggleIsActive}
          onChange={handleToggle}
        />
        <button onClick={() => router.push("userAlt")} type="button" className={styles.userAlt}>
          Alterar
        </button>
      </div>
    </div>
  )
}