import nc from "next-connect";
import auth from "../../middleware/auth";
import admin from "../../middleware/admin";
import Category from "../../../models/Category";
//import db from "../../../utils/db";
import clientPromise from '../../../lib/mongodbPromise.ts'
import slugify from "slugify";
//const handler = nc().use(auth).use(admin);
const handler = nc();

handler.post(async (req, res) => {
  try {
    const { name } = req.body;
    //db.connectDb();
  const client = await clientPromise;
  const db = await client.db("Authenticate");
    const test = await Category.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: "Категория с таким именем существует уже" });
    }
    await new Category({ name, slug: slugify(name) }).save();

   // db.disconnectDb();
    res.json({
      message: `Категория ${name} успешно создана`,
      categories: await Category.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    const { id } = req.body;
   // db.connectDb();
   const client = await clientPromise;
   const db = await client.db("Authenticate");
    await Category.findByIdAndRemove(id);
    //db.disconnectDb();
    return res.json({
      message: "Категория успешно удалена",
      categories: await Category.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
handler.put(async (req, res) => {
  try {
    const { id, name } = req.body;
    //db.connectDb();
    const client = await clientPromise;
    const db = await client.db("Authenticate");
    await Category.findByIdAndUpdate(id, { name });
    //db.disconnectDb();
    return res.json({
      message: "Категория успешно обновлена",
      categories: await Category.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;