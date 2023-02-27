import nc, {NextHandler} from "next-connect";

import { ObjectId } from "mongodb";
//import db from "../../../../utils/db";
import clientPromise from '../../../../lib/mongodbPromise.ts'
import {connectToDatabase} from '../../../../lib/mongodb'
import Project from "../../../../models/Project";
// import auth from "../../../middleware/auth";
// import admin from "../../../middleware/admin";
import slugify from "slugify";
//const handler = nc().use(auth).use(admin);
const handler = nc();

handler.post(async (req, res) => {
  try {
    //db.connectDb();
    const client = await clientPromise;
    const db = await client.db();
    req.body.slug = slugify(req.body.name);
// const findProject = await Project.findOne(req.body.name)
// if (findProject) {
//   return res
//   .status(400)
//   .json({message:"Проект с таким именем существует!"})
// }

      const newProject = new Project({
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        details: req.body.details,
        slug: req.body.slug,
        category: req.body.category,
        images:req.body.images,
        
      });
      await newProject.save();
      res.status(200).json({ message: "Проект добавлен успешно." });
    
    }
   // db.disconnectDb();
   
   catch (error) {
    res.status(500).json({ message: error.message });
  }}
);

handler.delete(async (req, res) => {
  //try {
    const { _id } = req.body;
   
    //db.connectDb();
    // const client = await clientPromise;
    // const db = await client.db("Authenticate");
  const {db} = await connectToDatabase();
  await db.collection("projects")
  .findOneAndDelete(
   {"_id": ObjectId(_id)},
   

 );
 
  res.status(200).send({ message: "Проект успешно удален." });//{...res}.matchedCount;

  //   await Project.findByIdAndRemove(_id);
  
  //   return res.json({
  //     message: "Проект успешно удален",
  //   });
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
 // }
});
handler.put(async (req, res) => {
  //try {
    const { _id, description, category  } = req.body;
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
    { $set: { "description": description, "category": ObjectId(category)} },
    ]

  );
  
   res.status(200).send({ message: "Проект успешно обновлен." });//{...res}.matchedCount;
 
 //   const projects = await db.collection("projects")
//   .aggregate([
//     {$match:
//          {_id: ObjectId('$_id')}
//     },        
//     {$project:
//         {
  
//          description: '$description'             
//         }     
//     },
// ])

//     return res.json({
//       message: "Проект успешно обновлен",
//      // projects: await Project.find({}).sort({ createdAt: -1 }),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
});

export default handler;
/*
 if (req.body.parent) {
      const parent = await Project.findById(req.body.parent);
      if (!parent) {
        return res.status(400).json({
          message: "Родительский проект не найден !",
        });
      } else {
        const newParent = await parent.updateOne(
          {
            $push: {
              subProducts: {
                sku: req.body.sku,
                images: req.body.images,
    
              },
            },
          },
          { new: true }
        );
      }
    } else {
*/