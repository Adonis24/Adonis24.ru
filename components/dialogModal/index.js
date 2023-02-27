import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useSelector, useDispatch } from "react-redux";
import { showDialog, hideDialog } from "../../store/DialogSlice";
import Link from "next/link";
import styles from "./styles.module.scss";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default function DialogModal() {
  const dispatch = useDispatch();
  const {expandSidebar, dialogSlice} = useSelector((state) => ({ ...state }));
  //const test = dialog.msgs.find((x) => x.type == "error");

  const handleClose = () => {
    dispatch(hideDialog());
  };

  return (
    <div
    style={{
      position: "fixed",
      zIndex: "999999999999999",
    }}
    >
      <Dialog
        open={dialogSlice.show}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        disableScrollLock={true}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
      >
        <DialogTitle
          className={`${styles.header} ${ styles.dialog_success }`}
        >
          {dialogSlice.header}
        </DialogTitle>
        <DialogContent className={styles.body}>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
          {dialogSlice.link?.link && (
            <Button>
              <Link href={dialogSlice.link.link}>
                <span>{dialogSlice.link.text}</span>
              </Link>
            </Button>
          )}
        </DialogActions>
      </Dialog> 
    </div>
  );
}