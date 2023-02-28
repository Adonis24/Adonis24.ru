import { Form, Formik, useField } from "formik";
import { useState } from "react";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import AdminInput from "../../inputs/adminInput";
import axios from "axios";
import AdonisTextArea from "../../inputs/adonisTextArea";
import Images from "../createProject/images";
import { uploadImages } from "../../../requests/upload";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Create({ setClients,db }) {
  const initialValues = {
    name: "",
    description: "",
  };
  const [client, setClient] = useState(initialValues);
  const [image, setImage] = useState("");
  const handleChange = (e) => {
    const { value, name } = e.target;
    setClient({ ...client, [name]: value });
  };
  const validate = Yup.object({
    name: Yup.string()
      .required("Клиент name is required.")
      .min(2, "Клиент name must be bewteen 2 and 30 characters.")
      .max(30, "Клиент name must be bewteen 2 and 30 characters."),
    /*.matches(
        /^[a-zA-Z\s]*$/,
        "Numbers and special charcters are not allowed."
      ) */
  });

  const submitHandler = async () => {
   
      //alert(JSON.stringify(values, null, 2))
       const { data } = await axios.post("/api/admin/client", { ...client });

      setClients(data.clients);
      toast.success(data.message);
      setSubmitting(false);
    
    //загружаем логотип сначала
    // var uploaded_uri = "";
    // console.log(...images)
    // if (images) {
    //   let temp = images.map((img) => {
    //     return dataURItoBlob(img);
    //   });
    //   const path = "images";

    //   let formData = new FormData();
    //   formData.append("path", path);
    //   temp.forEach((image) => {
    //     formData.append("file", image);
    //   });
    //   const uploaded_images = await uploadImages(formData);
    //   uploaded_uri = uploaded_images[0];
    // }
    //
    // console.log(JSON.parse(JSON.stringify({ ...client })));
    // try {
    //   const { data } = await axios.post("/api/admin/client", { ...client });
    //   setClients(data.clients);
    //   toast.success(data.message);
    // } catch (error) {
    //   toast.error(error.message);
    // }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          name: client.name,
          description: client.description,
        }}
        validationSchema={validate}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <Form>
            <div className={styles.header}>Создать клиента</div>
            <AdminInput
              type="text"
              label="Наименование"
              name="name"
              placholder="Наименование клиента"
              onChange={handleChange}
            />
            <AdonisTextArea
              label=""
              name="description"
              rows="6"
              onChange={handleChange}
            />
            {/* <Images   name="inputImage"
              header="Логотип"
              text="Добавить фотографии"
              images={images}
              setImages={setImages}/> */}
            <div className={styles.btnWrap}>
              <button type="submit" className={`${styles.btn} `}>
                <span>Добавить клиента</span>
              </button>
            </div>
            <ToastContainer />
          </Form>
        )}
      </Formik>
    </>
  );
}

