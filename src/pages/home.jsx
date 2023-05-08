// import { Button } from '@/components/Button'
// import styles from '@/styles/pages/Home.module.scss'
// import { useRouter } from "next/router"




// export default function Home() {

//   const userInfo = JSON.parse(localStorage.getItem('userData'))
//   const getOut = (router) => {
//     localStorage.clear()
//     router.push("/login")
//   }

//   const router = useRouter()
//   return (
//     <>
//       <span className={styles.saudation}>Seja bem-vindo {userInfo.userEmail}</span>
//       <div className={styles.Button}>
//         <Button onClick={() => getOut(router)} type="button" color={"goback"}>Sair</Button>
//       </div>
//       <div className={styles.container}>
//         <div className={styles.title}>
//           <img className={styles.logo} src="images/logo.png" alt="Logo-conquest" />
//         </div>
//         <div className={styles.data}>
//           <div className={styles.componentProduct}>
//             <img className={styles.btnProduct} src="images/iconProduct.png" onClick={() => router.push("product/prodList")} />
//             <p className={styles.paragraph}>Produto</p>
//           </div>
//           <div className={styles.componentUser}>
//             <img className={styles.btnUser} src="images/iconUser.png" onClick={() => router.push("user/userList")} />
//             <p className={styles.paragraph}>Usuários</p>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }



import { Button } from '@/components/Button'
import styles from '@/styles/pages/Home.module.scss'
import { useRouter } from "next/router"
import { useEffect, useState } from 'react'


export default function Home() {

  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem('userData')))
  }, [])

  const getOut = (router) => {
    localStorage.clear()
    router.push("/login")
  }

  const router = useRouter()
  return (
    <>
      <span className={styles.saudation}>Seja bem-vindo {userInfo?.userEmail}</span>
      <div className={styles.Button}>
        <Button onClick={() => getOut(router)} type="button" color={"goback"}>Sair</Button>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <img className={styles.logo} src="images/logo.png" alt="Logo-conquest" />
        </div>
        <div className={styles.data}>
          <div className={styles.componentProduct}>
            <img className={styles.btnProduct} src="images/iconProduct.png" onClick={() => router.push("product/prodList")} />
            <p className={styles.paragraph}>Produto</p>
          </div>
          <div className={styles.componentUser}>
            <img className={styles.btnUser} src="images/iconUser.png" onClick={() => router.push("user/userList")} />
            <p className={styles.paragraph}>Usuários</p>
          </div>
        </div>
      </div>
    </>
  )
}