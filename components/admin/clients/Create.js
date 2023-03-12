import { Form, Formik, Field, useField } from "formik";
import { useState } from "react";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import AdminInput from "../../inputs/adminInput";
import axios from "axios";
import AdonisTextArea from "../../inputs/adonisTextArea";
import FileInput from "../../inputs/fileInput";
import Images from "../createProject/images";
import { uploadImages } from "../../../requests/upload";
import dataURItoBlob from "../../../utils/dataURItoBlob";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import AvatarUploaded from "../../../utils/imageUpload";
// import Button from "@material-ui/core/Button";
import Thumb from "../../images";

export default function Create({ setClients }) {
  const initialValues = {
    name: "",
    description: "",
    file: undefined,
    image: "",
  };
  const [logo, setLogo] = useState("");
  const [imageUpload] = useState({});
  const [, setImg] = useState({});
  const [client, setClient] = useState(initialValues);
  const [image, setImage] = useState("");
  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
      setLogo(e.target.files[0]);
    }
  };
  const profileUpload = async (file) => {
    const formData = new FormData();
    let image = dataURItoBlob(file);
    formData.append("path", "images");
    formData.append("file", image);

    //   });
    //   const uploaded_images = await uploadImages(formData);
    //   uploaded_uri = uploaded_images[0];
    // }
    // formData.append("file", file);
    // formData.append("upload_preset", "ml_default");
    const { data } = await axios.post("/api/cloudinary", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    return data;
   
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setClient({ ...client, [name]: value });
    // alert(JSON.stringify({ ...client}, null, 2))
    //alert(JSON.stringify(formik.values.file, null, 2))
  };

  const handleFileChange = (event) => {
    formik.setFieldValue("file", event.target.files[0]);
    //setClient({...client,"file": event.target.files[0]})
  };
  const validate = Yup.object({
    name: Yup.string()
      .required("Клиент name is required.")
      .min(2, "Клиент name must be bewteen 2 and 300 characters.")
      .max(300, "Клиент name must be bewteen 2 and 300 characters."),
    /*.matches(
        /^[a-zA-Z\s]*$/,
        "Numbers and special charcters are not allowed."
      ) */
  });

  const submitHandler = async (values) => {
   //  alert(JSON.stringify(logo, null, 2))
  
    const arrUrl = await profileUpload(logo);
    // setTimeout(() => {
    // }, "2000");
    const image_url = arrUrl[0].url;
    // alert(JSON.stringify(image_url, null, 2))
    if (image_url) {
      setClient({ ...client, image: image_url });
    }
    const { data } = await axios.post("/api/admin/client", { ...client, image: image_url});
    setClients(data.clients);
    toast.success(data.message);
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          name: client.name,
          description: client.description,
          file: client.file,
        }}
        validationSchema={validate}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <Form>
            <div className={styles.header}>Создать клиента</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <AdminInput
                type="text"
                label="Наименование"
                name="name"
                placholder="Наименование клиента"
                onChange={handleChange}
              />
    
              <div className="form-group">
                <AdonisTextArea
                  label=""
                  name="description"
                  rows="6"
                  onChange={handleChange}
                />
                <label for="file">Загрузка логотипа</label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={async (event) => {
                    formik.setFieldValue("file", event.target.files[0]);
                    //alert(JSON.stringify( event.target.files[0] , null, 2));
                    setClient({ ...client, file: event.target.files[0] });
                  }}
                  className="form-control"
                />
                <Thumb file={formik.values.file} setLogo={setLogo} />
              </div>
              <div className={styles.btnWrap}>
                <button type="submit" className={`${styles.btn} `}>
                  <span>Добавить клиента</span>
                </button>
              </div>
            </div>
            <ToastContainer />
          </Form>
        )}
      </Formik>
    </>
  );
}

//<div>
//<h1
//style={{
//  textAlign: "center",
//  color: "grey",
//  marginTop: "90px",
//marginRight: "130px",
//}}
//>
//логотип
//</h1>
//<div style={{ marginLeft: "50px", marginTop: "50px" }}></div>
//</div>
