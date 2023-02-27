import Link from "next/link";
import styles from "./style.module.scss";
import { signOut, signIn } from "next-auth/react";
export default function UserMenu({ session }) {
  return (
    <div className={styles.menu}>
      <h4>Добро пожаловать!</h4>
      {session ? (
        <div className={styles.flex}>
          <img src={session?.user?.image} alt="" className={styles.menu__img} />
          <div className={styles.col}>
            <span>Добро пожаловать!</span>
            <h3>{session?.user?.name}</h3>
            <span onClick={() => signOut()}>Выйти</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary}>Зарегистриваться</button>
          <button className={styles.btn_outlined} onClick={() => signIn()}>
            Войти
          </button>
        </div>
      )}
      <ul>
        <li>
          <Link href="/profile">Учетная запись</Link>
        </li>
     
        <li>
          <Link href="/profile/messages">Отправить сообщение</Link>
        </li>
     
        
      </ul>
    </div>
  );
}