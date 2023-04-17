import styles from './Styles.module.scss'
import { useRouter } from 'next/router'

export function prodCard({...rest }) {
  return (
    <div className={styles.container}>
      <div className={styles.prodImage}>
        <img src="" alt="Conquest Logo"/>
      </div>
      <div className={styles.detail}>
        <strong></strong>
        <p></p>
        <strong></strong>
        <p></p>
        <div className={styles.price}>
          <strong></strong>
          <p></p>
        </div>
      </div>
    </div>
  )
}