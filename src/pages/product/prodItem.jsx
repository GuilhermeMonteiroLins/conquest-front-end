import { ProdItemCard } from '@/components/ProdItemCard'
import styles from '../../styles/pages/product/ProdItem.module.scss'

export default function ProdItem(){
  return(
    <div className={styles.container}>
      <h1>Pedido </h1>

      <ProdItemCard></ProdItemCard>

      <div className={styles.summary}>
      <div className={styles.infoPrice}>
        <p><strong>Frete: </strong>R$ 45,90</p>
        <p><strong>Preço Total: </strong>R$ 1,145,90</p>
        <p><strong>Status: </strong>Entregue</p>
      </div>
      <div className={styles.infoAddress}>
        <div className={styles.line}></div>
        <div className={styles.infoAddressLeft}>
          <p><strong>CEP: </strong>123.45-678</p>
          <p><strong>Estado: </strong>SP</p>
          <p><strong>Cidade: </strong>São Paulo</p>
        </div>
        <div className={styles.infoAddressRight}>
          <p><strong>Bairro: </strong>Pinheiros</p>
          <p><strong>Logadouro: </strong>Av. Nações Unidas</p>
          <p><strong>Numero: </strong>117</p>
        </div>
      </div>
      </div>
    </div>
  )
}