import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { tempUrl } from "../../contexts/ContextProvider";
import { Loader } from "../../components";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Autocomplete
} from "@mui/material";
import { useStateContext } from "../../contexts/ContextProvider";
import { useForm } from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";

const TambahBukuBesar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { screenSize } = useStateContext();
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [kelompok, setKelompok] = useState("");
  const [jenisSaldo, setJenisSaldo] = useState("");
  const [jenis, setJenis] = useState("");
  const [kelompokBukuBesar, setKelompokBukuBesar] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const optionJenisSaldo = [{ label: "DEBET" }, { label: "KREDIT" }];

  const optionJenis = [{ label: "KAS/BANK" }, { label: "NON KAS/BANK" }];

  // optionKelompokBukuBesar
  const optionKelompokBukuBesar = kelompokBukuBesar.map((val) => ({
    label: `${val.kode} - ${val.nama}`
  }));

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/kelompokBukuBesars`);
    setKelompokBukuBesar(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/bukuBesars`, {
        kode,
        nama,
        kelompok,
        jenisSaldo,
        jenis
      });
      setLoading(false);
      navigate("/bukuBesar");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ pt: 5 }}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Tambah Daftar Buku Besar
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
                Nama Account
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
                  required: "Nama Account harus diisi!"
                })}
                error={!!errors?.nama}
                helperText={errors?.nama ? errors.nama.message : null}
                onChange={(e) => setNama(e.target.value)}
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography sx={{ margin: 1, fontWeight: "500" }}>
                Kelompok
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={optionKelompokBukuBesar}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register("kelompok", {
                      required: "Kelompok harus diisi!"
                    })}
                    error={!!errors?.kelompok}
                    helperText={
                      errors?.kelompok ? errors.kelompok.message : null
                    }
                  />
                )}
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                onInputChange={(e, value) =>
                  setKelompok(value.split(" ", 1)[0])
                }
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography sx={{ margin: 1, fontWeight: "500" }}>
                Jenis Saldo
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={optionJenisSaldo}
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register("jenisSaldo", {
                      required: "Jenis Saldo harus diisi!"
                    })}
                    error={!!errors?.jenisSaldo}
                    helperText={
                      errors?.jenisSaldo ? errors.jenisSaldo.message : null
                    }
                  />
                )}
                onInputChange={(e, value) => setJenisSaldo(value)}
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography sx={{ margin: 1, fontWeight: "500" }}>
                Jenis
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={optionJenis}
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register("jenis", {
                      required: "Jenis harus diisi!"
                    })}
                    error={!!errors?.jenis}
                    helperText={errors?.jenis ? errors.jenis.message : null}
                  />
                )}
                onInputChange={(e, value) => setJenis(value)}
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

export default TambahBukuBesar;
