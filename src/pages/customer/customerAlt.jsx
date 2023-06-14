/* eslint-disable react/jsx-boolean-value */
import { useEffect, useState } from "react";
import styles from "@/styles/pages/customer/customerAlt.module.scss";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import validarNome from "@/util/validarNome";
import {
  apiCustomerAlt,
  apiCustomerData,
  apiListAddress,
  apiDisableAddress,
} from "@/services/api";

export default function CustomerAlt() {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [endereco, setEndereco] = useState(null);
  const router = useRouter();

  const fetchCustomerData = async () => {
    const customerData = await apiCustomerData(
      JSON.parse(localStorage.getItem("userData")).customerId
    );
    setId(customerData.userId);
    setNome(customerData.userName);
    setGenero(customerData.userGender);
    setDataNascimento(customerData.userBirthDate);
    setSenha(customerData.userPassword);
    setSenha2(customerData.userPassword);
  };

  const fetchCustomerAddress = async () => {
    if (id != 0) {
      const response = await apiListAddress(id);

      response.json().then((json) => {
        setEndereco(json);
      });
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  useEffect(() => {
    fetchCustomerAddress();
  }, [id]);

  const checaNome = (nome) => {
    if (validarNome(nome) == false) {
      alert(
        "Nome Inválido! Verifique se o nome não contém caracteres especiais"
      );
      setNome("");
      return false;
    } else {
      setNome(nome);
      return true;
    }
  };

  const checaSenha = (senha, senha2) => {
    if (senha !== senha2) {
      alert("Senha Inválida!!!");
      setSenha("");
      setSenha2("");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validadeFields()) {
      return alert("Campo inválido.");
    }
    let data = apiCustomerAlt(id, nome, genero, dataNascimento, senha);

    alert("Usuário alterado!");

    router.push("/");
  };

  const validadeFields = () => {
    let isValidNome = checaNome(nome);
    let isValidSenha = checaSenha(senha, senha2);

    if (isValidNome && isValidSenha) {
      return true;
    }
    return false;
  };

  const handleDeleteAddress = async (idAddress, isAddressCustomer) => {
    if (!isAddressCustomer) {
      const response = await apiDisableAddress(idAddress);
      alert("O endereço foi Excluido com sucesso");
    } else {
      alert(
        "Esse endereço não pode ser excluido pois é o endereço de faturamento"
      );
    }
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    router.push("/customer/customerAddAddress");
  };

  return (
    <>
      <button onClick={() => router.push("/")} type="button">
        Voltar
      </button>
      <div className={styles.container}>
        <div className={styles.tittle}>
          <h1>Alterar dados usuário</h1>
        </div>
        <div className={styles.content}>
          
        
          
          <div className={styles.altUser}>
            
            <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.tittle2}>
          <h3>Dados do usuario</h3>
        </div>
              <Input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                type="text"
                placeholder="Digite seu nome"
                label="Nome:"
                maxLength="100"
                required
              />
              <Input
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                type="text"
                placeholder="Digite seu Genero"
                label="Genero:"
                maxLength="11"
              />
              <Input
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                type="date"
                placeholder="Digite sua data de nascimento"
                label="Data de Nascimento:"
                maxLength="11"
              />
              <Input
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                type="password"
                placeholder="Digite sua senha"
                label="Senha:"
              />
              <Input
                value={senha2}
                onChange={(e) => setSenha2(e.target.value)}
                type="password"
                placeholder="Digite sua senha"
                label="Repita sua senha:"
              />
              <div className={styles.submit}>
                <Button
                  type="reset"
                  color="cancel"
                  onClick={() => router.push("/")}
                >
                  Cancelar
                </Button>
                <Button type="submit" color="primary">
                  Salvar
                </Button>
              </div>
            </form>
            <form>
              <div className={styles.listEnd}>
                <h2>Lista de Endereços</h2>
                <div className={styles.add}>
                  <button onClick={(e) => handleAddAddress(e)}>
                    {" "}
                    Adicionar endereço{" "}
                  </button>
                </div>
                <ul>
                  {endereco?.map((address, index) =>
                    address.status == true ? (
                      <div className={styles.card} key={index}>
                        <div className={styles.delete}>
                          <button
                            onClick={() =>
                              handleDeleteAddress(
                                address.addressId,
                                address.addressCustomer
                              )
                            }
                          >
                            x
                          </button>
                        </div>
                        <p>CEP: {address.cep}</p>
                        <p>Logradouro: {address.logradouro}</p>
                        <p>Bairro: {address.bairro}</p>
                        <p>Localidade: {address.localidade}</p>
                        <p>UF: {address.uf}</p>
                        <p>Complemento: {address.complemento}</p>
                        <p>Número: {address.numero}</p>
                      </div>
                    ) : (
                      <></>
                    )
                  )}
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
