import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { tempUrl } from "../../contexts/ContextProvider";
import { Loader } from "../../components";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { useStateContext } from "../../contexts/ContextProvider";
import { useForm } from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";

const TambahJurnalUmum = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { screenSize } = useStateContext();
  const [noJurnalUmum, setNoJurnalUmum] = useState("");
  const [tanggal, setTanggal] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const saveUser = async (e) => {
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/jurnalUmums`, {
        noJurnalUmum,
        tanggal
      });
      setLoading(false);
      navigate("/jurnalUmum");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ pt: 10 }}>
      <Typography color="#757575">Laporan</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Tambah Daftar Jurnal Umum
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
              maxWidth: {
                md: "40vw"
              }
            }}
          >
            <Box sx={{ marginTop: 2 }}>
              <Typography sx={{ margin: 1, fontWeight: "500" }}>
                Nomor Bukti
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                value={noJurnalUmum}
                {...register("noJurnalUmum", {
                  required: "Nomor Bukti Account harus diisi!"
                })}
                error={!!errors?.noJurnalUmum}
                helperText={
                  errors?.noJurnalUmum ? errors.noJurnalUmum.message : null
                }
                onChange={(e) => setNoJurnalUmum(e.target.value)}
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography sx={{ margin: 1, fontWeight: "500" }}>
                Tanggal
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                value={tanggal}
                {...register("tanggal", {
                  required: "Tanggal harus diisi!"
                })}
                error={!!errors?.tanggal}
                helperText={errors?.tanggal ? errors.tanggal.message : null}
                onChange={(e) => setTanggal(e.target.value)}
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

export default TambahJurnalUmum;
