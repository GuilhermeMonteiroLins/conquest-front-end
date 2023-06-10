import React, { useState } from 'react';
import styles from './DropDown.module.scss'
import { apiUpdateOrder } from "@/services/api";
import { useRouter } from 'next/router';

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar se o dropdown está aberto ou fechado
  const [selectedOption, setSelectedOption] = useState(null); // Estado para armazenar a opção selecionada
  const router = useRouter();

  const options = [...props.options]

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    handleRequestApi(option)
    router.reload("customer/orders")
  };

  const handleRequestApi = async (option) => {
    await apiUpdateOrder(option.label, option.value.customerId, option.value.userId, option.value.orderId)
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownToggle} onClick={toggleDropdown}>
        <img src="/images/listaPedidos.png" alt="Configurações de Usuario" style={{height: "50px", width: "50px"}} />
      </div>
      {isOpen && (
        <ul className={styles.dropdownOptions}>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={styles.dropdownOption}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;