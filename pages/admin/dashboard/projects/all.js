import styles from '../../../../styles/projects.module.scss'
import Layout from "../../../../components/admin/layout";
import ProjectCard from '../../../../components/admin/projects/projectCard'
// import Project from '../../../../models/Project'
//  import Category from '../../../../models/Category';
//import clientPromise from '../../../../lib/mongodbPromise.ts'
//import db from '../../../../utils/db'
import { connectToDatabase } from "../../../../lib/mongodb";
import {useRouter} from 'next/router';
import { useState } from 'react';

//import { deepPurple } from '@mui/material/colors';
//import List from '../../../../components/admin/projects/List'

export default function All({projects}){

  const [data, setData] = useState(projects);
    const router = useRouter();
    const handleCreateProject = ()=>router.push("/admin/dashboard/projects/create");
    return (
        <Layout>
          <div className={styles.header}>
            <div style={{alighnItems:'flex-start'}}>
                Проекты 
                <button type="button"  onClick={handleCreateProject} class="btn btn-primary" style={{marginLeft:10, width:100}}>Добавить</button>
                </div>    
          </div>
     
        
          {projects.map((project) => (
            <ProjectCard project={project}  key={project._id} />
          ))}  
          
        </Layout>
      );
}

export async function getServerSideProps(){
  // const client = await clientPromise;
  // const db = await client.db();

  const { db } = await connectToDatabase();
  //  const projects = await Project.find({})
  //    .populate({ path: "category", model: Category })
  //    .sort({ createdAt: -1 })
  //    .lean();
  const projects = await db
  .collection("projects")
  .aggregate([
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
    }
  ]

  )
  .toArray();
 

  // .find({})
  // .toArray();
  // const categories = await db

  //   .collection("category")
  //   .find({})
  //   .limit(20)
  //   .toArray();

  //res.json(categories);
  //await db.connectDb();
//const categories = await Category.find().lean();


    // const projects = await Project.find({})
    //  .populate({ path: "category", model: Category })
    //  .sort({ createdAt: -1 })
    //  .lean();
//await db.disconnectDb();
return {
    props: {
        projects:JSON.parse(JSON.stringify(projects))
    }
}
}

/*

 {projects.map((project) => (
            <ProjectCard project={project} key={project._id} />
          ))}
 <List projects={data} setProjects={setData} />
        */