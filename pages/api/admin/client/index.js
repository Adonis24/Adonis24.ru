import nc, { NextHandler } from "next-connect";
import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodbPromise.ts";
import { connectToDatabase } from "../../../../lib/mongodb";
import Client from "../../../../models/Client";
// import auth from "../../../middleware/auth";
// import admin from "../../../middleware/admin";
import slugify from "slugify";
//const handler = nc().use(auth).use(admin);
const handler = nc();

handler.post(async (req, res) => {
  //console.log(JSON.parse(JSON.stringify(req)));
  try {
    const { name, description } = req.body;
    // const client = await clientPromise;
    // const db = await client.db("Auth");
    // const test = await Client.findOne({ name });
    // if (test) {
    //   return res
    //     .status(400)
    //     .json({ message: "Клиент с таким именем существует уже" });
    // }
    // await new Client({
    //   name,
    //   description,
    // }).save();
    const { db } = await connectToDatabase();
    var clientFound = await db.collection('clients').findOne({ name });
    if (!clientFound) {
      await db.collection('clients').insertOne({
        name,
        description,
      });
    }
    res.json({
      message: `Клиент ${name} успешно создан`,
      clients: await db.collection('clients').find({}).sort({ updatedAt: -1 }).toArray(),
    });
    //req.body.slug = slugify(req.body.name);
    // const {db} = await connectToDatabase();
    //await db.collection("clients").save( { name, description } )
    //await db.clients.save( { name, description } )
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  //try {
  const { _id } = req.body;
  const { db } = await connectToDatabase();
  await db.collection("clients").findOneAndDelete({ _id: ObjectId(_id) });

  res.status(200).send({ message: "Клиент успешно удален." }); //{...res}.matchedCount;
});
handler.put(async (req, res) => {
  //try {
  const { _id, name, description } = req.body;

  const { db } = await connectToDatabase();
  await db
    .collection("clients")
    .updateOne({ _id: ObjectId(_id) }, [
      { $set: { description: description, name: name } },
    ]);

  res.status(200).send({ message: "Клиент успешно обновлен." }); //{...res}.matchedCount;
});

export default handler;
// const test = await Client.findOne({ name });
// if (test) {
//   return res
//     .status(400)
//     .json({ message: "Клиент с таким именем существует уже" });
// }

// await new Client({
//     name,
//     description

//   }).save();

//   res.json({
//     message: `Категория ${name} успешно создана`,
//     clients: await Client.find({}).sort({ updatedAt: -1 }),
//   });
// } catch (error) {
//   res.status(500).json({ message: error.message });
// }}
