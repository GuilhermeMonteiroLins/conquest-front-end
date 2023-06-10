import React, { useState } from 'react';
import style from './ModalAddress.module.scss'

const ModalAddress = ({ addresses, onClose, onSelect}) => {
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleSelect = (address) => {
    localStorage.setItem('address', address)
    setSelectedAddress(address)
  };

  const handleSubmit = () => {
    onClose();
    onSelect(selectedAddress)
  };

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <h2>Selecione um endereço</h2>
        <ul>
          {addresses?.map((address) => (

            address.status == true ?
              <>

                <li
                  key={address.id}
                  onClick={() => handleSelect(address)}
                  className={selectedAddress === address ? 'selected' : ''}
                >
                  <p>{address.addressId}</p>
                  <p>{address.bairro}</p>
                  <p>{address.cep}</p>
                  <p>{address.localidade}</p>
                  <p>{address.logradouro}</p>
                  <p>{address.numero}</p>

                </li>
              </>
              : <></>

          ))}
        </ul>
        <div className={style.modalActions}>
          <button onClick={onClose}>Fechar</button>
          <button onClick={handleSubmit} disabled={!selectedAddress}>
            Selecionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddress;