import styles from '@/styles/pages/product/ProdCad.module.scss'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { useRouter } from "next/router";
import { apiProdUpdate, apiProdVisualize } from '@/services/api'
import ImageList from '@/components/ImageList';
import { useEffect, useState } from 'react';

export default function ProdAlt() {
  const [prodId, setProdId] = useState('');
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodQtd, setProdQtd] = useState('');
  const [prodValue, setProdValue] = useState('');
  const [prodReview, setProdReview] = useState('');
  const [prodStatus, setProdStatus] = useState('');
  const [prodImages, setProdImages] = useState([]);
  const router = useRouter()

  const handleRemoveImage = (index) => {
    const newImages = [...prodImages];
    newImages.splice(index, 1);
    setProdImages(newImages)
  }

  const handleFileChange = (event) => {
    event.preventDefault();
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      let listImages = images;
      reader.onload = async () => {
        let data = await reader.result;
        listImages.push({ "imageBase64": data });
      }
      setProdImages(listImages);

      reader.onerror = async (error) => {
        throw Error("Error to covert image to base64" + error)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("está entrando na funcao")
    let data = apiProdUpdate(prodId, prodName, prodDesc, prodQtd, prodValue, prodReview, prodStatus, prodImages)
    console.log("essa é a minha", data) 
    alert("Produto Alterado!")
  }

  const fetchProdData = async () => {
    const prodDados = await apiProdVisualize(JSON.parse(localStorage.getItem('idProduto')))
    console.log(prodDados)
    setProdId(prodDados.productId);
    setProdName(prodDados.productName);
    setProdDesc(prodDados.productDescription);
    setProdQtd(prodDados.productQuantity);
    setProdValue(prodDados.productValue);
    setProdReview(prodDados.productReview);
    setProdStatus(prodDados.productStatus);
    setProdImages(prodDados.productImages);
  }

  useEffect(() => {
    fetchProdData()
  }, [])

  return (
    <div className={styles.page}>
      <button onClick={() => router.push("/product/prodList")} type="button">Voltar</button>
      <h1>Alteração de produtos</h1>
      <div className={styles.container}>
        <div className={styles.content}>
          <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            <Input
              // value={prodImages}
              onChange={handleFileChange}
              type="file"
              accept="image/png, image/jpeg" />
              
              <div className={styles.img}>
                <ImageList
                  images={prodImages}
                  onRemoveImage={handleRemoveImage}
                />
              </div>
            <Input
              value={prodName}
              onChange={(e) => setProdName(e.target.value)}
              type="text"
              placeholder="Nome do item"
              label="Titulo do Produto:"
              required
              maxLength="200"
            />
            <div className={styles.smallInputs}>
              <Input
                value={prodValue}
                onChange={(e) => setProdValue(e.target.value)}
                type="number"
                min="0.00"
                step="0.01"
                presicion={2}
                placeholder="Valor do Produto"
                label="Valor:"
                required />
              <Input
                value={prodQtd}
                onChange={(e) => setProdQtd(e.target.value)}
                type="number"
                placeholder="Disponibilidade de estoque"
                min="0"
                label="Estoque:"
                required />
              <Input
                value={prodReview}
                onChange={(e) => setProdReview(e.target.value)}
                id="number-input"
                max="5"
                min="0"
                step="0.5"
                type="number"
                placeholder="Avalição do item"
                label="Avalição:"
                required />
            </div>
            <div className={styles.descript}>
              <Input
                value={prodDesc}
                onChange={(e) => setProdDesc(e.target.value)}
                type="text"
                placeholder="Descrição do produto"
                label="Descrição:"
                maxLength="2000"
                required />
            </div>

            <div className={styles.buttons}>
              <Button
                type="reset"
                color="cancel"
                onClick={() => {
                  setProdImages('');
                  setProdName('');
                  setProdValue('');
                  setProdQtd('');
                  setProdReview('');
                  setProdDesc('');
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" color="primary">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}