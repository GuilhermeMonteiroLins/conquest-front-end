import React from 'react';
import styles from './Styles.module.scss';

const Header = (props) => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src="/images/logo.png" alt="Logo da Conquest"/>
            </div>
            <div className={styles.search}>
                <input type="text" placeholder='Pesquise por um produto!'/>
                <button>🔎</button>
            </div>
            <div className={styles.child}>
                <div className={styles.cart}> 
                    <button>🛒Carrinho</button>
                </div>
                <div className={styles.login}>
                    <span>Login/Cadastrar</span>
                </div>
            </div>
        </header>
    );
}

export default Header;