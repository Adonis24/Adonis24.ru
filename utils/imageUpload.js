import React, { createRef, useState } from "react";
import { ErrorMessage, useField } from "formik";
import { Avatar, Button as MuiButton } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import { spacing } from "@mui/system";
import styled from "styled-components";

const Button = styled(MuiButton)(spacing);
const CentredContent = styled.div`
  text-align: left;
  margin-left:10px;
`;
const BigAvatar = styled(Avatar)`margin-left: 1%,
border: 1px solid grey;
margin-top: 10%;
box-shadow: 1px 1px 15px -5px black;
`;
export default function AvatarUploaded({...props}) {
 // const [field, meta] = useField(props);
 const {logo} = props
  const [image, _setImage] = useState(logo);
  const inputFileRef = createRef();
  const cleanup = () => {
    URL.revokeObjectURL(image && props.image);
    inputFileRef.current.value = null;
  };
  const setImage = (newImage) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };

  const handleOnChange = (event) => {
    const newImage = event.target.files[0];
    if (newImage) {
      setImage(URL.createObjectURL(newImage));
    }
    props.imageUpload(event);
 
  };
  return (
    <CentredContent>
      <BigAvatar
        alt="Avatar"
        src={image}
        style={{ width: "110px", borderRadius: "50%", height: "100px" }}
        {...props}
>
        <input 
        ref = {inputFileRef}
        accept="image/*"
        hidden
        id="avatar-image-upload"
        type='file'
        onChange={handleOnChange}
        {...props}
        />
        <label htmlFor="avatar-image-upload">
        {/* <Button 
        color="primary"
        component='span'
        style={{
          marginBottom: "100px",
          width: "130px", 
          borderRadius: "25px",
          fontFamily: "arial",
        textAlign: "left",
        padding: "5px" 
      
      }}
      {...props}
        >

          {image ? <DeleteIcon mr="2"/> :<UploadIcon mr="2"/>}
          {image ? "Uploaded" : "Upload"}

        </Button> */}
</label>
      </BigAvatar>
    </CentredContent>
  );
}
