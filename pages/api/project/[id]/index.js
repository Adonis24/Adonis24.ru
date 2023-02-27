import nc from "next-connect";
import Project from "../../../../models/Project";
import clientPromise from "../../../../lib/mongodbPromise.ts";
import {connectToDatabase} from '../../../../lib/mongodb'
import { ObjectId } from "mongodb";
const handler = nc();

handler.get(async (req, res) => {
  try {
    //db.connectDb();
    const id = req.query.slug;
    const project = await Project.findOne({slug}).lean();
   // const project = await Project.findById(id).lean();
       // db.disconnectDb();
    return res.json({
      _id: project._id,
      style: Number(style),
      name: project.name,
      description: project.description,
      slug: project.slug,
      brand: project.brand,
      category: project.category,
      images: product.images,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
handler.put(async (req, res) => {
  //try {
    const _id = req.query.slug;
    const {  description } = req.body;
    // console.log(_id+description)
    //db.connectDb();
    // const client = await clientPromise;
    // const db = await client.db("Authenticate");
  const {db} = await connectToDatabase();

//   const fProject = await db.collection("projects")
//   .find({'_id':ObjectId(_id)}).toArray();
//  console.log(fProject)
   // await Project.findByIdAndUpdate(id, { description });
     await db.collection("projects")
   .updateOne(
    {"_id": ObjectId(_id)},
    [
    { $set: { "description": description}, category:ObjectId(category) },
    ]

  );
  
   res.status(200).send({ message: "Проект успешно обновлен." });//{...res}.matchedCount;
 

});

export default handler;
