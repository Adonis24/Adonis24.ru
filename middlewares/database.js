import clientPromise from '../lib/mongodbPromise.ts'
import {connectToDatabase} from '../lib/mongodb'




export  async function setUpDb(db) {
  db.collection('users').createIndex({ email: 1 }, { unique: true });
}

export default async function database(req, res, next) {
 
    // In production mode, it's best to not use a global variable.
 try {
  
  const client = await clientPromise;
  req.dbClient = client;
  req.db = client.db("Authenticate");
 

//   const connetion =  await connectToDatabase();
//  req.dbClient =  connetion.client;
//  req.db =  connetion.db;
  await setUpDb(req.db);
  return next();
 } catch(e){
  console.log('Ошибка подключения')
 }

 
 
}

/*
import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("posts");
    const { title, content } = req.body;

    const post = await db.collection("posts").insertOne({
      title,
      content,
    });

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }


      await client.connect()
  .then((response)=>{
    req.dbClient = response;
    req.db = response.db("Authenticate");
     setUpDb(req.db);
    return next();
  })

}; */
