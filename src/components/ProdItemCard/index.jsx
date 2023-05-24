import styles from './Styles.module.scss'

export function ProdItemCard({}){
  return(
    <div className={styles.container}>
      <div className={styles.card}>
      <div className={styles.info}>
        <p><strong>Marca: </strong>Caloi</p>
        
        <p><strong>Modelo: </strong>BMX</p>
      </div>
      <div className={styles.price}>
        
      <p><strong>Quantidade: </strong>1</p>
      <p><strong>Valor do produto: </strong>R$ 1,000.00</p>
      </div>
      </div>
      <div className={styles.image}>
        <img src="" alt="Imagem do produto"/>
      </div>
    </div>
  )
}