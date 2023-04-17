/* eslint-disable react/jsx-boolean-value */
import { useState } from "react";
import styles from "@/styles/pages/user/UserCad.module.scss";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import validarCPF from "@/util/validarCPF";
import validarNome from "@/util/validarNome";
import { ApiUserAlt } from "@/services/api";

export default function Home() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [grupo, setGrupo] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

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

  const checaBotaoGrupo = () => {
    const radioButtons = document.querySelectorAll('input[name="grupo"]');
    let isRadioSelected = false;

    radioButtons.forEach(function (button) {
      if (button.checked) {
        isRadioSelected = true;
      }
    });

    if (!isRadioSelected) {
      alert("Nenhum botão de grupo selecionado!!!");
    }
    return isRadioSelected;
  };

  const checaBotaoStatus = () => {
    const radioButtons = document.querySelectorAll('input[name="status"]');
    let isRadioSelected = false;

    radioButtons.forEach(function (button) {
      if (button.checked) {
        isRadioSelected = true;
      }
    });

    if (!isRadioSelected) {
      alert("Nenhum botão de status selecionado!!!");
    }
    return isRadioSelected;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validadeFields()) {
      return alert("Campo inválido.");
    }
    let data = ApiUserAlt(nome, cpf, senha, grupo, status);
    console.log(data);
    alert("Usuário alterado!");
  };

  const validadeFields = () => {
    let isValidCPF = checaCPF(cpf);
    let isValidNome = checaNome(nome);
    let isValidSenha = checaSenha(senha, senha2);
    let idCheckedBotaoGrupo = checaBotaoGrupo();
    let idCheckedBotaoStatus = checaBotaoStatus();

    if (
      isValidNome &&
      isValidCPF &&
      isValidSenha &&
      idCheckedBotaoGrupo &&
      idCheckedBotaoStatus
    ) {
      return true;
    }
    return false;
  };
  return (
    <>
      <button onClick={() => router.push("/user/userList")} type="button">
        Voltar
      </button>
      <div className={styles.container}>
        <div className={styles.tittle}>
          <h1>Alterar usuário</h1>
        </div>
        <div className={styles.data}>
          <form onSubmit={handleSubmit} className={styles.form}>
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
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              type="text"
              placeholder="Digite seu CPF"
              label="CPF:"
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
            <span>Grupo: </span>
            <input
              onChange={() => setGrupo(1)}
              type="radio"
              name="grupo"
              value={1}
            />
            Administrador
            <input
              onChange={() => setGrupo(2)}
              type="radio"
              name="grupo"
              value={2}
            />
            Estoquista
            <br />
            <div className={styles.submit}>
              <Button
                type="reset"
                color="cancel"
                onClick={() => {
                  setNome('');
                  setCpf('');
                  setEmail('');
                  setGrupo('');
                  setSenha('');
                  setSenha2('');
                  setStatus('');
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
    </>
  );
}
