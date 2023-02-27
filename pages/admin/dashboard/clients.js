import Layout from "../../../components/admin/layout";
import db from "../../../utils/db";
import {connectToDatabase} from '../../../lib/mongodb'
import { useState } from "react";
import Create from "../../../components/admin/clients/Create";
import List from "../../../components/admin/clients/List";
export default function Clients({ clients }) {

  const [data, setData] = useState(clients);
  return (
    <Layout>
      <div>
        <Create setClients={setData} />
        <List clients={data} setClients={setData} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
 // db.connectDb();
 const { db } = await connectToDatabase();
 const clients = await db

 .collection("clients")
 .find({})
 .limit(20)
 .toArray();
  //const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
  return {
    props: {
      clients: JSON.parse(JSON.stringify(clients)),
    },
  };
}
