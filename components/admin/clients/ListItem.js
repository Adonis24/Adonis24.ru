import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import AvatarUploaded from "../../../utils/imageUpload";
export default function ListItem({ client, setClients }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const input = useRef(null);
  const router = useRouter();
  const handleRemove = async (id) => {
  // alert(JSON.stringify( id , null, 2))
    try {
      const res = await axios.delete("/api/admin/client",{data:{id}})
      .then(
         router.push("/admin/dashboard/clients",undefined ,{shallow: false })
      )
        
      // setClients(clients.filter(newClient => newClient._id!==id))
        toast.success(res.data.message);
        

    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.put("/api/admin/client", {
        id,
        name,
      });
      setClients(data.clients);
      setOpen(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <li className={styles.list__item}>
       <AvatarUploaded logo={client.image}
          /> 
      <input
        className={open ? styles.open : ""}
        type="text"
        value={name ? name : client.name}
        onChange={(e) => setName(e.target.value)}
        disabled={!open}
        ref={input}
      />
      {open && (
        <div className={styles.list__item_expand}>
          <button
            className={styles.btn}
            onClick={() => handleUpdate(client._id)}
          >
            Сохранить
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              setOpen(false);
              setName("");
            }}
          >
            Отмена
          </button>
        </div>
      )}
       
      <div className={styles.list__item_actions}>
        {!open && (
          <AiTwotoneEdit
            onClick={() => {
              setOpen((prev) => !prev);
              input.current.focus();
            }}
          />
        )}
        <AiFillDelete onClick={ () => handleRemove(client._id)} />
     
      </div>
    </li>
  );
}
   //() => handleRemove(client._id)} />