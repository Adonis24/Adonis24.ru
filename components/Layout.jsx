/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { RiAccountCircleFill, RiArrowDropDownFill } from "react-icons/ri";
import { GrEmoji } from "react-icons/gr";
import { AiTwotoneHome } from "react-icons/ai";
import { FaFacebook, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import Router from "next/router";
import { useUser } from "../lib/hooks";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const [user, { mutate }] = useUser();
  const [loading, isLoading] = useState(false);
  const router = useRouter();
 const handleLogout = async () => {
    isLoading(true);
    await fetch("/api/auth", {
      method: "DELETE",
    });
    // set the user state to null
    mutate(null);
    isLoading(false);
    router.push("/");
  };
  return (
    <>
      <header>
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
                <span className="navbar-toggler-icon"></span>{" "}
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
                  <Link href="/projects" className="nav-link">
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
                  </>
                ) : (
                  <li className="nav-item">
                    <Link
                      href="/user/[userId]"
                      as={`/user/${user._id}`}
                      className="nav-link"
                    >
                      
                      <span>{user?.name}</span>
                      <RiAccountCircleFill />
                    
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}

/*
 <style jsx>{`
                    .container{
                        height:85vh;
                    }    
                    main{
                        min-height:85vh;
                    }
                `}</style>

                <li className="nav-item">
                      <Link href="/signup" className="nav-link">
                        Регистрация
                      </Link>
                    </li>
*/
