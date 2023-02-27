import styles from "../../../../styles/projects.module.scss";
import Layout from "../../../../components/admin/layout";
import db from "../../../../utils/db";
//import {connectToDatabase} from '../../../../lib/mongodb'
//import clientPromise from '../../../../lib/mongodbPromise.ts'
import Category from "../../../../models/Category";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SingularSelect from "../../../../components/selects/SingularSelect";
import MultipleSelect from "../../../../components/selects/MultipleSelect";
import AdminInput from "../../../../components/inputs/adminInput";
import DialogModal from "../../../../components/dialogModal";
import { useDispatch } from "react-redux";
import { showDialog } from "../../../../store/DialogSlice";
import Images from "../../../../components/admin/createProject/images";
import Style from "../../../../components/admin/createProject/style";
import Details from "../../../../components/admin/createProject/clickToAdd/Details";
//import { validateCreateProject } from "../../../../utils/validation";
import dataURItoBlob from "../../../../utils/dataURItoBlob";
import { uploadImages } from "../../../../requests/upload";
const initialState = {
  name: "",
  description: "",
  brand: "",
  images: [],
  description_images: [],
  category: "",
  details:[],

  
};
export default function Create({  categories }) {
  const [project, setProject] = useState(initialState);
  const [images, setImages] = useState([]);
  const [description_images, setDescription_images] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  
  const handleChange = (e) => {
    const { value, name } = e.target;
    setProject({ ...project, [name]: value });
  };
  // const validate = Yup.object({
  //   name: Yup.string()
  //     .required("Наименование проекта")
  //     .min(10, "Длина от 10 до 300")
  //     .max(300, "Длина от 10 до 300"),
  //   brand: Yup.string().required("Конфигурация внедрения"),
  //   category: Yup.string().required("Категория бизнеса"),

 
  //   description: Yup.string().required("Please add a description"),
  // });
  const createProject = async () => {
    await createProjectHandler();
  }

  const style_img = "";
  const createProjectHandler = async () => {
    var uploaded_images = [];
    setLoading(true);
    if (images) {
      let temp = images.map((img) => {
        return dataURItoBlob(img);
      });
      const path = "images";
     
      let formData = new FormData();
      formData.append("path", path);
      temp.forEach((image) => {
        formData.append("file", image);
      });
      uploaded_images = await uploadImages(formData);
    }

    try {
      const { data } = await axios.post("/api/admin/project", {
        ...project,
        images: uploaded_images,
       
      });
      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout>
      <div className={styles.header}>Создать проект</div>
      <Formik
        enableReinitialize
        initialValues={{
          name: project.name,
          brand: project.brand,
          description: project.description,
          category: project.category,
          details: [],
          imageInputFile: "",
          styleInout: "",
        }}
       
        onSubmit={() => {
          createProject();
        }}
      >
        {(formik) => (
          <Form>
           
        
        
            <SingularSelect
              name="category"
              value={project.category}
              placeholder="Категория"
              data={categories}
              header="Выберите категорию"
              handleChange={handleChange}
             
            />
         
            <div className={styles.header}>Основное описание
            <AdminInput
              type="text"
              label="Наименование"
              name="name"
              placholder="Наименование проекта"
              onChange={handleChange}
            />
            <AdminInput
              type="text"
              label="Описание проекта"
              name="description"
              placholder="Описание проекта"
              onChange={handleChange}
            />
            <AdminInput
              type="text"
              label="Конфигурация"
              name="brand"
              placholder="Конфигурация проекта"
              onChange={handleChange}
            />
        <Images
              name="imageInputFile"
              header="Фотографии"
              text="Добавить фотографии"
              images={images}
              setImages={setImages}
       
            />
           
            <Details
              details={project.details}
              project={project}
              setProject={setProject}
            />
            </div>
            {/*
            <Images
              name="imageDescInputFile"
              header="Product Description Images"
              text="Add images"
              images={description_images}
              setImages={setDescriptionImages}
              setColorImage={setColorImage}
            />
           
       
          
            */}
            <button
              className={`${styles.btn} ${styles.btn__primary} ${styles.submit_btn}`}
              type="submit"
            >
             Создать проект
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
  db.connectDb();
  // const client = await clientPromise;
  //   const db = await client.db();
 const categories = await Category.find().lean();
//  const { db } = await connectToDatabase();
//   const categories = await db
//   .collection("categories")
//   .find({})
//   .toArray();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
/*
 validationSchema={validate}
   details: [
    {
      name: "",
      value: "",
    },
  ],
*/