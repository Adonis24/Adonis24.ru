
import React, {useState, useEffect} from "react";
import {useField,ErrorMessage} from 'formik'

export default function Thumb(props) {
  const { file } = props;
  const setLogo = props.setLogo;
  //const [field, meta] = useField(props);
    const initialState = {
        loading: false,
        thumb: undefined,
      };    
    const  [state, setState] = useState(initialState);
   
    const { loading, thumb } = state;
    
useEffect(() => {
 
//  alert(JSON.stringify(file, null, 2))
    if (!file) { return; }
    setState({ loading: true })
      let reader = new FileReader(); 
      reader.onload = (e) => {
      //  alert(JSON.stringify(e.target.result, null, 2))
        setState({ loading: false, thumb: e.target.result }); 
        setLogo(e.target.result)
      }
      reader.readAsDataURL(file);  

  },[props.file]);

return (
<>
{ (!file) ? (<></>):(
  <>
{(loading) ? (<p>loading...</p> ):
(<img src={thumb}
  alt={file.name}
  className="img-thumbnail mt-2"
  height={200}
  width={200} />)
}
</>
) }

</>
)
}

