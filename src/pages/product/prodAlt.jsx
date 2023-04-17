import styles from '@/styles/pages/product/ProdCad.module.scss'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { useRouter } from 'next/router'

export default function ProdCad() {
  // const [] = useState('')
  // const [] = useState('')
  // const [] = useState('')
  // const [] = useState('')
  // const [] = useState('')
  // const [] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validadeFields()){
      return alert("Campo inválido.")
    }
    const payload = {
      
    }
    alert("Produto Cadastrado!")
    router.push("/product/list")
    console.log(JSON.stringify(payload))
  }

  return(
    <div className={styles.page}>
      <button>Voltar</button>
      <h1>Alteração de produtos</h1>
          <div className={styles.container}>
            <div className={styles.content}>
            <Input type="file" accept="image/png, image/jpeg"/>
            <Input 
            value={null}
            onChange={(e) => setNome(e.target.value)}
            type="text"
            placeholder="Nome do item"
            label="Item:"/>
            <div className={styles.smallInputs}>
              <Input 
              value={null}
              onChange={(e) => setValor(e.target.value)}
              type="number"
              placeholder="Valor do item"
              label="Valor:"/>
              <Input 
              value={null}
              onChange={(e) => setEstoque(e.target.value)}
              type="text"
              placeholder="Disponibilidade de estoque"
              label="Estoque:"/>
              <Input 
              value={null}
              onChange={(e) => setAvalicao(e.target.value)}
              type="text"
              placeholder="Avalição do item"
              label="Avalição:"/>
            </div>
            <div className={styles.descript}>
              <Input 
              value={null}
              onChange={(e) => setDescricao(e.target.value)}
              type="text"
              placeholder="Descrição do produto"
              label="Descrição:"/>
            </div>
          </div>
          
          <div className={styles.buttons}>
          <Button type="reset" color="cancel">
              Cancelar
            </Button>
            <Button type="submit" color="primary" onClick={null}>
              Salvar
            </Button>
          </div>
        </div>
    </div>
  )
}