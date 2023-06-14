import React, { useState } from 'react';
import style from './ModalAddress.module.scss'
import { Button } from '@/components/Button'
import { Router } from 'react-router-dom';
import { useRouter } from 'next/router';

const ModalAddress = ({ addresses, onClose, onSelect }) => {
  const [selectedAddress, setSelectedAddress] = useState('');
  const router = useRouter();

  const handleSelect = (address) => {
    localStorage.setItem('address', address)
    setSelectedAddress(address)
  };

  const handleSubmit = () => {
    onClose();
    onSelect(selectedAddress)
  };

  const handleAddAddress = () => {
    router.push("/customer/customerAddAddress")
  };

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <h2 className={style.h2}>Selecione um endereço</h2>
      <Button onClick={handleAddAddress} type="button" color={"goback"}>Adicionar Novo Endereço</Button>
        <section>
          {addresses?.map((address) => (

            address.status == true ?
              <>
                <div className={style.card}>
                  <div
                    key={address.id}
                    onClick={() => handleSelect(address)}
                    className={selectedAddress === address ? 'selected' : ''}
                  >
                    <p className={style.id}><strong>ID:</strong> {address.addressId}</p>
                    <p className={style.infAddress}><strong>Bairro:</strong> {address.bairro}</p>
                    <p className={style.infAddress}><strong>CEP: </strong>{address.cep}</p>
                    <p className={style.infAddress}><strong>Localidade: </strong>{address.localidade}</p>
                    <p className={style.infAddress}><strong>Logradouro: </strong>{address.logradouro}</p>
                    <p className={style.infAddress}><strong>Número: </strong>{address.numero}</p>

                  </div>
                </div>
              </>
              : <></>

          ))}
        </section>
        <div className={style.modalActions}>
          <Button onClick={onClose} type="button" color={"cancel"} >Cancelar</Button>
          <Button onClick={handleSubmit} disabled={!selectedAddress} type="button" color={"primary"} style={{marginLeft:"10px", backgroundColor:selectedAddress? "#3fbe5b" : "#565856"}}>
            Selecionar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddress;