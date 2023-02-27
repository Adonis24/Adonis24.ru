import Layout from "../../../components/admin/layout";
import styles from "../../../styles/dashboard.module.scss";

import Head from "next/head";
import { useSession } from "next-auth/react";
import Dropdown from "../../../components/admin/dashboard/dropdown";
import Notifications from "../../../components/admin/dashboard/notifications";
import { TbUsers } from "react-icons/tb";
import { SlHandbag, SlEye } from "react-icons/sl";
import { SiProducthunt } from "react-icons/si";
import { GiTakeMyMoney } from "react-icons/gi";
import {useUser} from '../../../lib/hooks'
import Link from "next/link";
export default function Dashboard({ products  }) {
  //const { data: session } = useSession();
  const [user,{mutate}] = useUser();
  return (
    <div>
      <Head>
        <title>Adonis - Admin Dashboard</title>
      </Head>
      <Layout>
        <div className={styles.header}>
          <div className={styles.header__search}>
            <label htmlFor="">
              <input type="text" placeholder="Поиск..." />
            </label>
          </div>
          <div className={styles.header__right}>
            <Dropdown userImage={user?.image} />
            <Notifications />
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <TbUsers />
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SlHandbag />
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SiProducthunt />
            </div>
            
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <GiTakeMyMoney />
            </div>
    
          </div>
        </div>
    
      </Layout>
    </div>
  );
}

/*
import Product from "../../../models/Product";
<div className={styles.card__infos}>
              <h4>+{products.length}</h4>
              <span>Products</span>
            </div>
            
            
export async function getServerSideProps({ req }) {

  
   const projects = await Product.find().lean();
  return {props:
    {
    products: JSON.parse(JSON.stringify(products))
  }
  }

}

            */