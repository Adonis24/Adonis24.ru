import React, { Component, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./style.module.scss";
import session from "redux-persist/lib/storage/session";
import { useSession, signIn, signOut } from "next-auth/react";


const Navigation = () => {
return (<></>);
};

export default Navigation;
/*    <Top {...session}className="nav-link"/>
   <li className="nav-item">
           
              <Link href="" onClick={handlerSignIn} className="nav-link"> Войти</Link>
              </li>
                <>
                                            <div style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
  
                                                 </div>
                                        </>
style={{ alignSelf: 'end' }}


  const { push, asPath } = useRouter();
  const handlerSignIn = () => push(`/auth/signin?callbackUrl=${asPath}`);

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    push(data.url);
  };
  return (
    <nav id="menu" className="navbar  navbar-expand-lg navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-brand">
          <button
            class="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#bs-example-navbar-collapse-1"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>{" "}
          </button>
          {""}
          {""}
          {""}
          {""}
          <a className="navbar-brand " href="../">
            АДОНИС
          </a>
          {""}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
              <Link href="../about" className="nav-link">
                О Компании
              </Link>
            </li>
            <li className="nav-item">
              <a href="../knowledges" className="nav-link ">
                База знаний
              </a>
            </li>
            <li className="nav-item">
              <Link href="../services" className="nav-link">
                Услуги
              </Link>
            </li>
            <li className="nav-item">
              <Link href="../projects" className="nav-link">
                Наши проекты
              </Link>
            </li>
            <li className="nav-item">
              <Link href="../testimonials" className="nav-link">
                Отзывы
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#team" className="nav-link">
                Команда
              </Link>
            </li>
            <li className="nav-item">
              <Link href="../contact" className="nav-link">
                Контакты
              </Link>
            </li>

            {!user ? (
              <>
                <li className="nav-item">
                  <Link href="/login" className="nav-link">
                    Войти
                  </Link>
                </li>
                <li className="nav-item" >
                  <Link href="/signup" className="nav-link">
                    Регистрация
                  </Link>
                </li>
              </>
            ) : (
              <>
               
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Link href="/user/[userId]" as={`/user/${user._id}`}>
                    Профиль
                  </Link>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
*/
