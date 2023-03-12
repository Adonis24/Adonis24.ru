import { ErrorMessage, useField } from "formik";
import Thumb from "../../images";
import styles from "./styles.module.scss";

// export default function FileInput({ placeholder, label, ...props }) {
//   const [field, meta] = useField(props);
//   return (
//     <>
// <label for="file">File upload</label>
// <input id= {field.id} name={field.name} type={field.type} onChange={(event) => {
//   formik.setFieldValue("file", event.target.files[0]);
// }} className="form-control" />
// <Thumb file={formik.values.file} />
// </>
// )
// }