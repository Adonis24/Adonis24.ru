import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { toggleSidebar } from "../../../../store/ExpandSlice";
//-----------------------
import {
  MdArrowForwardIos,
  MdOutlineCategory,
  MdSpaceDashboard,
} from "react-icons/md";
import {MdOutlineRestaurantMenu, MdCarRepair,MdHouse,MdPointOfSale} from 'react-icons/md'
import { FcGraduationCap } from "react-icons/fc";
import { IoListCircleSharp, IoNotificationsSharp } from "react-icons/io5";
import { ImUsers } from "react-icons/im";
import { AiFillMessage } from "react-icons/ai";
import { FaThList } from "react-icons/fa";
import { GiReceiveMoney} from 'react-icons/gi'
import { BsPatchPlus } from "react-icons/bs";
import {
  RiCoupon3Fill,
  RiLogoutCircleFill,
  RiSettingsLine,
} from "react-icons/ri";
//-----------------------
//import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../../../../lib/hooks";
export default function Sidebar({categories}) {
  const router = useRouter();
  const route = router.pathname.split("/admin/dashboard/")[1];
  const [user,{mutate}] = useUser();
  const dispatch = useDispatch();
  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const expand = expandSidebar.expandSidebar;
  const handleExpand = () => {
    dispatch(toggleSidebar());
  };
  const Categories_icons = {
    "Рестораны и общепит": <MdOutlineRestaurantMenu/>,
     "Автосервисы": <MdCarRepair/>,
     "Строительство": <MdHouse/>,
     "Оптовая торговля": <MdPointOfSale/>
  }
  return (
    <div className={`${styles.sidebar} ${expand ? styles.opened : ""}`}>
      <div className={styles.sidebar__toggle} onClick={() => handleExpand()}>
        <div
          style={{
            transform: `${expand ? "rotate(180deg)" : ""}`,
            transition: "all .2s",
          }}
        >
          <MdArrowForwardIos />
        </div>
      </div>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar__header}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={styles.sidebar__list}>
          <li className={route == undefined ? styles.active : ""}>
            <Link href="/admin/dashboard">
              <>
                <MdSpaceDashboard />
                <span className={styles.show}>Направления</span>
              </>
            </Link>
          </li>
          {categories.map((category) =>
          
           
          (

            <li
              key={category.name}
              className={route == "knowledges" ? styles.active : ""}
            >
               
              <Link href="/admin/dashboard/knowledges">
                <>
                {Categories_icons[category.name]} 
             
                 
                  <span className={styles.show}> {category.name}</span>
                </>
              </Link>
            </li>
          
          ))}
         
        </ul>
      </div>
    </div>
  );
}

/*
   const ComponentIcon =  Categories_icons[category.name];
      < ComponentIcon />
 <li className={route == "knowledges" ? styles.active : ""}>
            <Link href="/admin/dashboard/knowledges">
              <>
                <FcGraduationCap />
                <span className={styles.show}> База знаний</span>
              </>
            </Link>
          </li>
          <li className={route == "services" ? styles.active : ""}>
            <Link href="admin/dashboard/services">
              <>
                <GiReceiveMoney />
                <span className={styles.show}> Услуги</span>
              </>
            </Link>
          </li>

          <li className={route == "projects/all" ? styles.active : ""}>
            <Link href="/admin/dashboard/projects/all">
              <>
                <FcAcceptDatabase />
                <span className={styles.show}>Проекты</span>
              </>
            </Link>
          </li>
          <li className={route == "testimonials" ? styles.active : ""}>
            <Link href="/admin/dashboard/testimonials">
              <>
                <IoListCircleSharp />
                <span className={styles.show}>Отзывы</span>
              </>
            </Link>
          </li>
          <li className={route == "users" ? styles.active : ""}>
            <Link href="/admin/dashboard/users">
              <>
                <ImUsers />
                <span className={styles.show}>Команда</span>
              </>
            </Link>
          </li>
          <li className={route == "messages" ? styles.active : ""}>
            <Link href="/admin/dashboard/messages">
              <>
                <AiFillMessage />
                <span className={styles.show}>Messages</span>
              </>
            </Link>
          </li>

        <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Категории</div>
          </div>
          <ul className={styles.sidebar__list}>
            <li className={route == "categories" ? styles.active : ""}>
              <Link href="/admin/dashboard/categories">
                <>
                  <MdOutlineCategory />
                  <span className={styles.show}>Категории</span>
                </>
              </Link>
            </li>
            
          </ul>
        </div>
*/