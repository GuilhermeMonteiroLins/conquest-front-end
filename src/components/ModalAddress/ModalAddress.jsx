import React, { useState } from 'react';
import style from './ModalAddress.module.scss'

const ModalAddress = ({ addresses, onClose, onSelect }) => {
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleSelect = (address) => {
    setSelectedAddress(address);
  };

  const handleSubmit = () => {
    onSelect(selectedAddress);
    onClose();
  };

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <h2>Selecione um endereço</h2>
        <ul>
          {addresses.map((address) => (
            <li
              key={address}
              onClick={() => handleSelect(address)}
              className={selectedAddress === address ? 'selected' : ''}
            >
              {address}
            </li>
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