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

const ButtonModifierForJurnalUmum = ({
  id,
  kode,
  addLink,
  editLink,
  deleteUser,
  aJurnalUmums,
  user
}) => {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);

  const handleClickOpenUser = () => {
    setOpenUser(true);
  };

  const handleCloseUser = () => {
    setOpenUser(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ButtonGroup variant="contained">
        {user && user.isAdmin ? (
          <Button
            color="success"
            sx={{ bgcolor: "success.light", textTransform: "none" }}
            startIcon={<AddCircleOutlineIcon />}
            size="small"
            onClick={() => {
              navigate(addLink);
            }}
          >
            Tambah
          </Button>
        ) : (
          <>
            <Button
              color="success"
              sx={{ bgcolor: "success.light", textTransform: "none" }}
              startIcon={<AddCircleOutlineIcon />}
              size="small"
              onClick={handleClickOpenUser}
            >
              Tambah
            </Button>
          </>
        )}
        {kode && user && user.isAdmin ? (
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
            {aJurnalUmums.length === 0 ? (
              <Button
                color="error"
                startIcon={<DeleteOutlineIcon />}
                sx={{ textTransform: "none" }}
                onClick={() => deleteUser(id)}
              >
                Hapus
              </Button>
            ) : (
              <Button
                color="error"
                startIcon={<DeleteOutlineIcon />}
                sx={{ textTransform: "none" }}
                onClick={handleClickOpen}
              >
                Hapus
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              color="primary"
              startIcon={<EditIcon />}
              sx={{ textTransform: "none" }}
              onClick={handleClickOpenUser}
            >
              Ubah
            </Button>
            {aJurnalUmums.length === 0 ? (
              <Button
                color="error"
                startIcon={<DeleteOutlineIcon />}
                sx={{ textTransform: "none" }}
                onClick={() => deleteUser(id)}
              >
                Hapus
              </Button>
            ) : (
              <Button
                color="error"
                startIcon={<DeleteOutlineIcon />}
                sx={{ textTransform: "none" }}
                onClick={handleClickOpenUser}
              >
                Hapus
              </Button>
            )}
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
          {"Ingin menghapus Jurnal Umum?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Jurnal Umum hanya bisa dihapus setelah dikosongkan
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openUser}
        onClose={handleCloseUser}
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
          <Button onClick={handleCloseUser}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ButtonModifierForJurnalUmum;
