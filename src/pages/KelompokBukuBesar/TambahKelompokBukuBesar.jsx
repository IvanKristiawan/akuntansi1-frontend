import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { tempUrl } from "../../contexts/ContextProvider";
import { Loader } from "../../components";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { useStateContext } from "../../contexts/ContextProvider";
import { useForm } from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";

const TambahKelompokBukuBesar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { screenSize } = useStateContext();
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const saveUser = async (e) => {
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/kelompokBukuBesars`, {
        kode,
        nama,
        jenis
      });
      setLoading(false);
      navigate("/kelompokBukuBesar");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ p: 2, pt: 10 }}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Tambah Kelompok Buku Besar
      </Typography>
      <Divider sx={{ mt: 2 }} />
      <form onSubmit={handleSubmit(saveUser)}>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row"
            }
          }}
        >
          <Box
            sx={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              mr: {
                xs: 0,
                sm: 10
              }
            }}
          >
            <Box>
              <Typography sx={{ margin: 1, fontWeight: "500" }}>
                Kode
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={kode}
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                {...register("kode", {
                  required: "Kode harus diisi!"
                })}
                error={!!errors?.kode}
                helperText={errors?.kode ? errors.kode.message : null}
                onChange={(e) => setKode(e.target.value)}
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography sx={{ margin: 1, fontWeight: "500" }}>
                Nama
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                value={nama}
                {...register("nama", {
                  required: "Nama Kelompok harus diisi!"
                })}
                error={!!errors?.nama}
                helperText={errors?.nama ? errors.nama.message : null}
                onChange={(e) => setNama(e.target.value)}
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography sx={{ margin: 1, fontWeight: "500" }}>
                Jenis Account
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                value={jenis}
                {...register("jenis", {
                  required: "Jenis Account harus diisi!"
                })}
                error={!!errors?.jenis}
                helperText={errors?.jenis ? errors.jenis.message : null}
                onChange={(e) => setJenis(e.target.value)}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
            Simpan
          </Button>
        </Box>
      </form>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default TambahKelompokBukuBesar;
