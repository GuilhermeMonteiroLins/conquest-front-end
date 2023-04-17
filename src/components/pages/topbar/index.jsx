import styles from './Styles.module.scss'
import { useRouter } from 'next/router'

export function Topbar({...rest }) {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="" alt="Conquest Logo"/>
      </div>
      <div className={styles.search}>
        <input 
        type="text"
        placeholder="Busca de produto"/>
      </div>
      <div className={styles.favs}>
        <button className={styles.cart}></button>
        <button className={styles.liked}></button>
      </div>
      <div className={styles.options}>
        <button>Bicicletas</button>
        <button>Componentes</button>
        <button>Vestuário</button>
        <button>Acessórios</button>
      </div>
    </div>
  )
}