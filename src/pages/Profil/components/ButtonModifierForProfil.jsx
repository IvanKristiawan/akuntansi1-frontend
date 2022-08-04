import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ButtonGroup,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const ButtonModifierForProfil = ({ id, kode, editLink, deleteUser, user }) => {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ButtonGroup variant="contained">
        {user ? (
          <>
            <Button
              color="primary"
              startIcon={<EditIcon />}
              sx={{ textTransform: "none" }}
              onClick={() => {
                navigate(editLink);
              }}
            >
              Ubah
            </Button>
            <Button
              color="error"
              startIcon={<DeleteOutlineIcon />}
              sx={{ textTransform: "none" }}
              onClick={() => deleteUser(id)}
            >
              Hapus
            </Button>
          </>
        ) : (
          <>
            {" "}
            <Button
              color="primary"
              startIcon={<EditIcon />}
              sx={{ textTransform: "none" }}
              onClick={handleClickOpen}
            >
              Ubah
            </Button>
            <Button
              color="error"
              startIcon={<DeleteOutlineIcon />}
              sx={{ textTransform: "none" }}
              onClick={handleClickOpen}
            >
              Hapus
            </Button>
          </>
        )}
      </ButtonGroup>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ingin mengubah data?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hanya Admin yang dapat mengubah data
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ButtonModifierForProfil;
