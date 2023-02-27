import styles from "../../styles/project.module.scss";
//import db from "../../utils/db";
import { connectToDatabase } from "../../lib/mongodb";
// import Project from "../../models/Project";
// import Category from "../../models/Category";
import Head from "next/head";
// import Header from "../../components/header";
// import Footer from "../../components/footer";
// import { produceWithPatches } from "immer";
import MainSwiper from "../../components/projectPage/mainSwiper";
import { useState } from "react";
import Layout from "../../components/admin/layout";
import Infos from "../../components/projectPage/infos";
// import Reviews from "../../components/projectPage/reviews";
//import clientPromise from '../../lib/mongodbPromise.ts'

//import ProjectsSwiper from "../../components/projectsSwiper";

export  default function ProjectPage({ project,categories }) {
  const [activeImg, setActiveImg] = useState("");
  
  return (
    <Layout>
      <Head>
        <title>{project.name}</title>
      </Head>
     
      <div className={styles.project}>
        <div className={styles.project__container}>
          <div className={styles.path}>
            Проекты / {project.category_docs.name} 
          </div>
            <div className={styles.project__main}> 
           {/* <MainSwiper images={project.images} activeImg={activeImg} />*/}
            <Infos project={project} categories = {categories} setActiveImg={setActiveImg} />
          </div>  
        </div>
      </div>
    </Layout>
  );
}

export async function  getServerSideProps(context) {
  // const { query } = context;
  // const slug = query.slug;
const { params, req, res, query } = context
const  {slug} = params;

const {db} = await connectToDatabase();
  // const project = await db
  // .collection("projects")
  // .findOne({slug});

  //работа с агрегаторами
  const categories = await db
  .collection("categories")
  .find({})
  .toArray();

  const project = await db
  .collection("projects")
  .aggregate([
    {
      $match:{slug:slug}

      },
    {
      
      $lookup:{
        from: "categories",
         localField: "category",
         foreignField: "_id",
         as: "category_docs"
      }

    },
    {
      $unwind:{
        'path':"$category_docs"}
    },
    
  ]

  )
.toArray()
;
  //

//  const client = await clientPromise;
//  const db = await client.db();
  //db.connectDb();
  //------------
 // res = axios.get(`http://localhost:3000/api/project/${slug}`);
  // let project = await Project.findOne({ slug:`${slug}` })
  //   .populate({ path: "category", model: Category })

  //   .lean();
  // console.log(project)
  // let newProject = {
  //   ...project,
  //console.log(Object.values(project)[0])
  return {
    props:
    {
      project: JSON.parse(JSON.stringify(Object.values(project)[0])),
      categories: JSON.parse(JSON.stringify(categories)),
    }
      //related: JSON.parse(JSON.stringify(related)),
  }
}

/*
 <Reviews project={project} />
  const [activeImg, setActiveImg] = useState("");
  reviews: project.reviews.reverse()
*/