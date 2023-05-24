import React, { useState } from "react";
import styles from "@/styles/pages/customer/customerCad.module.scss";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import validarCPF from "@/util/validarCPF";
import validarEmail from "@/util/validarEmail";
import { useRouter } from "next/router";
import { apiCustomerCad } from "@/services/api";
import { apiCEPList } from "@/services/api";

export default function UserCad() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [genero, setGenero] = useState("");
  const [dateAniver, setDateAniver] = useState("");

  const [CEP, setCEP] = useState("");
  const [logradouro, setlogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [uf, setUF] = useState("");
  const [complemento, setComplemento] = useState("");
  const [numero, setNumero] = useState("");

  const router = useRouter();

  const checaCPF = (cpf) => {
    if (validarCPF(cpf) == false) {
      alert("CPF Inválido! Verifique a formatação do CPF");
      setCpf("");
      return false;
    } else {
      setCpf(cpf);
      return true;
    }
  };

  const checaEmail = (email) => {
    if (validarEmail(email) == false) {
      alert("E-mail Inválido! Verifique se você informou um e-mail válido");
      setEmail("");
      return false;
    } else {
      setEmail(email);
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

  const handleValidateCEP = async () => {
    if (CEP.length === 8) {
      try {
        const { logradouro, bairro, localidade, uf } = await apiCEPList(CEP);
        setlogradouro(logradouro);
        setBairro(bairro);
        setLocalidade(localidade);
        setUF(uf);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const validarNomeCliente = (nome) => {
    const palavras = nome.trim().split(" ");
    if (palavras.length !== 2) {
      return false;
    }
    for (const palavra of palavras) {
      if (palavra.length < 3) {
        return false;
      }
    }
    return true;
  };

  if (validarNomeCliente(nome)) {
    console.log("Nome do cliente válido!");
  } else {
    console.log("Nome do cliente inválido!");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validadeFields()) {
      return alert("Campo inválido.");
    }

    window.alert("entrouuu");
    let data = apiCustomerCad(
      nome,
      cpf,
      email,
      senha,
      CEP,
      logradouro,
      bairro,
      localidade,
      uf,
      complemento,
      numero,
      genero,
      dateAniver
    );
    console.log(data);
    alert("Cliente Cadastrado!");
  };

  const validadeFields = () => {
    let isValidCPF = checaCPF(cpf);
    let isValidNome = validarNomeCliente(nome);
    let isValidEmail = checaEmail(email);
    let isValidSenha = checaSenha(senha, senha2);

    if (isValidNome && isValidCPF && isValidEmail && isValidSenha) {
      return true;
    }
    return false;
  };

  return (
    <div className={styles.container}>
      <button onClick={() => router.push("/")} type="button">
        Voltar
      </button>

      <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
          <div id="dados-pessoais">
            <h1>Dados Pessoais</h1>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
              <Input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                type="text"
                placeholder="Digite seu nome"
                label="Nome:"
                maxLength="100"
              />

              <Input
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                type="text"
                placeholder="Digite seu genêro"
                label="Digite seu genêro:"
              />
              <Input
                value={dateAniver}
                onChange={(e) => setDateAniver(e.target.value)}
                type="text"
                placeholder="Digite o aniversário"
                label="Digite a data do seu aniversário:"
              />
              <Input
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                type="text"
                placeholder="Digite seu CPF"
                label="CPF:"
                maxLength="11"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Digite seu e-mail"
                label="E-mail:"
                maxLength="40"
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
            </form>
          </div>

          <div id="endereco">
            <div className={styles.Endereco}>
              <h1>Endereço</h1>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                className={styles.form}
              >
                <Input
                  value={CEP}
                  onChange={(e) => setCEP(e.target.value)}
                  onBlur={handleValidateCEP}
                  type="text"
                  placeholder="Digite seu CEP"
                  label="CEP:"
                  maxLength="8"
                />
                <Input
                  value={logradouro}
                  onChange={(e) => setlogradouro(e.target.value)}
                  type="text"
                  placeholder="Digite seu logradouro"
                  label="logradouro:"
                  maxLength="100"
                  disabled
                />
                <Input
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  type="text"
                  placeholder="Digite seu bairro"
                  label="bairro:"
                  maxLength="40"
                  disabled
                />
                <Input
                  value={localidade}
                  onChange={(e) => setLocalidade(e.target.value)}
                  type="text"
                  placeholder="Digite sua localidade"
                  label="localidade:"
                  disabled
                />
                <Input
                  value={uf}
                  onChange={(e) => setUF(e.target.value)}
                  type="text"
                  placeholder="Digite sua uf"
                  label="Digite seu uf:"
                  disabled
                />
                <Input
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                  type="text"
                  placeholder="Digite sua complemento"
                  label="complemento:"
                />
                <Input
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  type="text"
                  placeholder="Digite seu numero"
                  label="Digite seu numero:"
                />
                <Button
                  type="reset"
                  color="cancel"
                  onClick={() => {
                    setNome("");
                    setCpf("");
                    setEmail("");
                    setSenha("");
                    setSenha2("");
                    setCEP("");
                    setlogradouro("");
                    setBairro("");
                    setLocalidade("");
                    setUF("");
                    setComplemento("");
                    setNumero("");
                    setGenero("");
                    setDateAniver("");
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit" color="primary">
                  Salvar
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className={styles.actions}></div>
      </div>
    </div>
  );
}
