import React, { useState } from 'react';
import styles from '@/styles/pages/customer/customerAlt.module.scss';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

const CustomerAlter = () => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [generos, setGeneros] = useState([]);

    const handleAlterarCadastro = () => {
        // Lógica para enviar os dados para a API e atualizar o cadastro do usuário
        // ...
    };

    const handleCancelar = () => {
        // Lógica para cancelar a alteração do cadastro e redirecionar o usuário para outra página
        // ...
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.containerInput}>
                    <h1 className={styles.h1}>Alterar Cadastro de Usuário</h1>
                    <label className={styles.label}>Nome:</label>
                    <Input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

                    <label className={styles.label}>CPF:</label>
                    <Input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />

                    <label className={styles.label}>Email:</label>
                    <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label className={styles.label}>Data de Nascimento:</label>
                    <Input
                        type="text"
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                    />

                    <label className={styles.label}>Senha:</label>
                    <Input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />

                    <label className={styles.label}>Confirmar Senha:</label>
                    <Input
                        type="password"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                    />

                    <label className={styles.label}>Gêneros:</label>
                    <select multiple value={generos} onChange={(e) => setGeneros(Array.from(e.target.selectedOptions, option => option.value))}>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="outro">Outro</option>
                    </select>
                    <div className={styles.buttonGroup}>
                        <Button className={styles.button} onClick={handleCancelar}>Cancelar</Button>
                        <Button className={styles.button} onClick={handleAlterarCadastro}>Alterar</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerAlter;