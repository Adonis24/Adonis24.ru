import nc, {NextHandler} from "next-connect";
import { ObjectId } from "mongodb";
import clientPromise from '../../../../lib/mongodbPromise.ts'
import {connectToDatabase} from '../../../../lib/mongodb'
import Client from "../../../../models/Client";
// import auth from "../../../middleware/auth";
// import admin from "../../../middleware/admin";
import slugify from "slugify";
//const handler = nc().use(auth).use(admin);
const handler = nc();

handler.post(async (req, res) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    req.body.slug = slugify(req.body.name);


      const newClient = new Client({
        name: req.body.name,
        description: req.body.description,
        image:req.body.inputImage,
        
      });
      await newClient.save();
      res.status(200).json({ message: "Проект добавлен успешно." });
    
    }
   
   catch (error) {
    res.status(500).json({ message: error.message });
  }}
);

handler.delete(async (req, res) => {
  //try {
    const { _id } = req.body;
   
  const {db} = await connectToDatabase();
  await db.collection("clients")
  .findOneAndDelete(
   {"_id": ObjectId(_id)},
   

 );
 
  res.status(200).send({ message: "Проект успешно удален." });//{...res}.matchedCount;

});
handler.put(async (req, res) => {
  //try {
    const { _id, name, description,   } = req.body;

  const {db} = await connectToDatabase();
     await db.collection("clients")
   .updateOne(
    {"_id": ObjectId(_id)},
    [
    { $set: { "description": description, "name": name} },
    ]

  );
  
   res.status(200).send({ message: "Клиент успешно обновлен." });//{...res}.matchedCount;

});

export default handler;
