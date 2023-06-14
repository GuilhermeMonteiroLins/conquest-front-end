import React from "react";
import { useState, useEffect } from "react";
import styles from "@/styles/pages/customer/customerAddAddress.module.scss";
import { apiAddAddress, apiCEPList } from "@/services/api";
import Head from "next/head";
import { useRouter } from "next/router";

import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import toastifyConfig from '@/util/ToastifyConfigs/toastifyConfig';

const UserAddAddress = () => {
  const [endereco, setEndereco] = useState({
    cep: "",
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: "",
    complemento: "",
    numero: null,
    addressCustomer: false,
  });

  const router = useRouter();

  const [userId, setUserId] = useState(0);

  const validarCep = async (CEP) => {
    let data = {};
    try {
      data = await apiCEPList(CEP);
      console.log(data);
      setEndereco({
        ...endereco,
        localidade: data.localidade,
        bairro: data.bairro,
        logradouro: data.logradouro,
        uf: data.uf,
      });
    } catch (e) {
      console.log(e);
    }
    console.log(data);
  };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await apiAddAddress(endereco, userId)

        if (Number(data.status) === 201) {
            Toastify(toastifyConfig.addressAdded).showToast()
        } else {
            Toastify(toastifyConfig.genericError).showToast()
        }
        router.push("/")
    }


  const handleClearForm = (e) => {
    e.preventDefault();
    setEndereco({
      cep: "",
      logradouro: "",
      bairro: "",
      localidade: "",
      uf: "",
      complemento: "",
      numero: null,
      addressCustomer: false,
    });
    router.push("/");
  };

  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem("userData")).customerId);
  }, []);

  return (
    <>
      <Head>
        <title>Adicionar Endereço</title>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/logo.png"
        ></link>
      </Head>
      <main className={styles.container}>
        <section>
          <h1>Adicionar Endereço: </h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.content}>
              <div className={styles.cep}>
                <label htmlFor="cep">CEP:</label>
                <div className={styles.divisao}>
                  <input
                    type="text"
                    required
                    pattern="[0-9]+"
                    name="cep"
                    value={endereco.cep}
                    onChange={(e) =>
                      setEndereco({
                        ...endereco,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <button onClick={(e) => validarCep(endereco.cep)}>🔎</button>
                </div>
              </div>
              <div className={styles.uf}>
                <label htmlFor="uf">UF:</label>
                <input
                  type="text"
                  required
                  name="uf"
                  value={endereco.uf}
                  disabled
                />
              </div>
              <div className={styles.nume}>
                <label htmlFor="uf">Número:</label>
                <input
                  type="number"
                  min="1"
                  required
                  name="numero"
                  value={endereco.numero}
                  onChange={(e) =>
                    setEndereco({
                      ...endereco,
                      [e.target.name]: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className={styles.logadouro}>
                <label htmlFor="estado">Logradouro:</label>
                <input
                  type="text"
                  required
                  name="logradouro"
                  value={endereco.logradouro}
                  disabled
                />
                <div className={styles.bairro}>
                  <label htmlFor="bairro">Bairro:</label>
                  <input
                    type="text"
                    required
                    name="bairro"
                    value={endereco.bairro}
                    disabled
                  />
                </div>
              </div>

              <div className={styles.localidade}>
                <label htmlFor="localidade">Localidade:</label>
                <input
                  type="text"
                  required
                  name="localidade"
                  value={endereco.localidade}
                  disabled
                />
                <div className={styles.complemento}>
                  <label htmlFor="uf">Complemento:</label>
                  <input
                    type="text"
                    required
                    name="complemento"
                    value={endereco.complemento}
                    onChange={(e) =>
                      setEndereco({
                        ...endereco,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className={styles.buttons}>
                <button
                  className={styles.cancelButton}
                  onClick={(e) => handleClearForm(e)}
                >
                  Cancelar
                </button>
                <button className={styles.sendButton} type="submit">
                  Salvar
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default UserAddAddress;
