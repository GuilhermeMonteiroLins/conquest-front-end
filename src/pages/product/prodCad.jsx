import React, { useState, useEffect } from 'react'
import ImageList from '@/components/ImageList'
import styles from '@/styles/pages/product/ProdCad.module.scss'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { useRouter } from 'next/router'
import { apiCadProduct } from '@/services/api'

export default function ProdCad() {
  const router = useRouter()
  const [form, setForm] = useState({});
  const [images, setImages] = useState([]);

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
      setImages(listImages);

      reader.onerror = async (error) => {
        throw Error("Error to covert image to base64" + error)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    let request = await {
      productName: data.productName,
      productValue: data.productValue,
      productDescription: data.productDescription,
      productQuantity: data.productQuantity,
      productReview: data.productReview,
      productImages: images
    }

    let result = await apiCadProduct(request);

    if (result === 201) {
      alert("Produto Cadastrado!")
      router.push("/product/prodList")
    } else {
      alert("Erro ao cadastrar o produto!");
    }
  }

  const handleInputChange = (event) => {
    console.log(images)
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className={styles.page}>
      <button onClick={() => router.push("/product/prodList")}>Voltar</button>
      <h1>Cadastro de produtos</h1>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.content}>
            <Input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              multiple
            />
            <div className={styles.img}>
              <ImageList
                images={images}
                onRemoveImage={handleRemoveImage}
              />
            </div>
            <Input
              name="productName"
              value={form.productName || ''}
              onChange={handleInputChange}
              type="text"
              placeholder="Nome do item"
              label="Titulo do Produto:"
              required
            />
            <div className={styles.smallInputs}>
              <Input
                name="productValue"
                value={form.productValue || ''}
                onChange={handleInputChange}
                type="decimal"
                placeholder="Valor do Produto"
                label="Valor:"
                required
              />
              <Input
                name="productQuantity"
                value={form.productQuantity || ''}
                onChange={handleInputChange}
                type="number"
                placeholder="Disponibilidade de estoque"
                label="Estoque:"
                required />
              <Input
                name="productReview"
                value={form.productReview || ''}
                onChange={handleInputChange}
                type="text"
                placeholder="Avalição do item"
                label="Avalição:"
                required
              />
            </div>
            <div className={styles.descript}>
              <Input
                name="productDescription"
                value={form.productDescription || ''}
                onChange={handleInputChange}
                type="text"
                placeholder="Descrição do produto"
                label="Descrição:"
                required
              />
            </div>
          </div>

          <div className={styles.buttons}>
            <Button type="reset" color="cancel">
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}