import React from "react";
import { useEffect, useState } from "react";
import styles from "@/styles/pages/ecommerce/home/Home.module.scss"

const Home = (props) => {

    const obj = { nome: 'sifoda', link: 'https://s3.amazonaws.com/media.wikiaves.com.br/images/1602/2061018_6590cfefff108e8b17f5fa805c297a56.jpg'}

    return (
        <div className={styles.container}>
            <header>
                <img 
                    src="./../../images/logo.png" 
                    alt="logotipo conquest"
                    className={styles.logo}
                />
                <div>
                    <input type="text" placeholder="Procure por um produto!"/>
                    <button>🔎</button>
                    <button>🛒</button>
                </div>
                <div>
                    <span>Logado/deslogado logar</span>
                    <img 
                        src="./../images/usericon.png" 
                        alt="" 
                        className={styles.logarlogo} 
                    />
                </div>
            </header>
            <main>
            <div className={styles.produto}>
                    <img src="./../images/image-2.jpg" alt="Imagem do produto" />
                    <span><strong>Nome:</strong>{'Montanhas Rochosas'}</span> <br/>
                    <span><strong>Review:</strong>{'4.5/10'}</span> <br/>
                    <span><strong>Valor:</strong>{'R$ 5000,90'}</span>
                </div>
                <div className={styles.produto}>
                    <img src={'https://s3.amazonaws.com/media.wikiaves.com.br/images/1602/2061018_6590cfefff108e8b17f5fa805c297a56.jpg'} alt="Imagem do produto" />
                    <span><strong>Nome:</strong>{'Montanhas Rochosas'}</span> <br/>
                    <span><strong>Review:</strong>{'4.5/10'}</span> <br/>
                    <span><strong>Valor:</strong>{'R$ 5000,90'}</span>
                </div>
                <div className={styles.produto}>
                    <img src="./../images/image-1.jpg" alt="Imagem do produto" />
                    <span><strong>Nome:</strong>{'Montanhas Rochosas'}</span> <br/>
                    <span><strong>Review:</strong>{'4.5/10'}</span> <br/>
                    <span><strong>Valor:</strong>{'R$ 5000,90'}</span>
                </div>
                <div className={styles.produto}>
                    <img src="./../images/image-4.jpg" alt="Imagem do produto" />
                    <span><strong>Nome:</strong>{'Montanhas Rochosas'}</span> <br/>
                    <span><strong>Review:</strong>{'4.5/10'}</span> <br/>
                    <span><strong>Valor:</strong>{'R$ 5000,90'}</span>
                </div>
                <div className={styles.produto}>
                    <img src="./../images/image-1.jpg" alt="Imagem do produto" />
                    <span><strong>Nome:</strong>{'Montanhas Rochosas'}</span> <br/>
                    <span><strong>Review:</strong>{'4.5/10'}</span> <br/>
                    <span><strong>Valor:</strong>{'R$ 5000,90'}</span>
                </div>
                <div className={styles.produto}>
                    <img src={obj.link} alt="Imagem do produto" />
                    <span><strong>Nome:</strong>{'Montanhas Rochosas'}</span> <br/>
                    <span><strong>Review:</strong>{'4.5/10'}</span> <br/>
                    <span><strong>Valor:</strong>{'R$ 5000,90'}</span>
                </div>
                <div className={styles.produto} onClick={(e) => window.alert('teste!')}>
                    <img src={'https://site-antigo.socioambiental.org/sites/blog.socioambiental.org/files/styles/twitter-card/public/blogs/galinha_rosa.jpg?itok=8C9EICkw'} alt="Imagem do produto" />
                    <span><strong>Nome:</strong>{'Montanhas Rochosas'}</span> <br/>
                    <span><strong>Review:</strong>{'4.5/10'}</span> <br/>
                    <span><strong>Valor:</strong>{'R$ 5000,90'}</span>
                </div>
                <div className={styles.produto}></div>
                <div className={styles.produto}></div>
                <div className={styles.produto}></div>
                <div className={styles.produto}></div>
                <div className={styles.produto}></div>
                <div className={styles.produto}></div>
                <div className={styles.produto}></div>
                <div className={styles.produto}></div>
                <div className={styles.produto}></div>
                <div className={styles.produto}></div>
                <div className={styles.produto}></div>
                <div className={styles.produto}></div>
                <div className={styles.produto}></div>
                <div className={styles.produto}></div>
                <div className={styles.produto}></div>
                <div className={styles.produto}></div>
                <div className={styles.produto}></div>
            </main>
        </div>
    )
}

export default Home;