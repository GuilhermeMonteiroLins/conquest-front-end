import styles from './Styles.module.scss'

export function Input({ name, label, ...rest }) {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <input name={name} {...rest} />
    </div>
  )
}