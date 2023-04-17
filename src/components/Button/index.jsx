/* eslint-disable react/button-has-type */
import styles from './Styles.module.scss'

export function Button({ color, children, ...rest }) {
  return (
    <div className={styles.container}>
      <button className={styles[color]} {...rest}>
        {children}
      </button>
    </div>
  )
}
