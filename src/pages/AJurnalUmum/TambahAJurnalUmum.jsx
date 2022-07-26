import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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

const TambahAJurnalUmum = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { screenSize } = useStateContext();
  const { id } = useParams();
  const [account, setAccount] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [debet, setDebet] = useState(0);
  const [kredit, setKredit] = useState(0);
  const navigate = useNavigate();
  const [bukuBesars, setBukuBesars] = useState([]);
  const [jurnalUmums, setJurnalUmums] = useState([]);
  const [loading, setLoading] = useState(false);

  const bukuBesarOptions = bukuBesars.map((bukuBesar) => ({
    label: `${bukuBesar.kode} - ${bukuBesar.nama}`
  }));

  useEffect(() => {
    getBukuBesars();
    getJurnalUmums();
  }, []);

  const getBukuBesars = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/bukuBesarKodeNamaKelompok`);
    setBukuBesars(response.data);
    setLoading(false);
  };

  const getJurnalUmums = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/jurnalUmums/${id}`);
    setJurnalUmums(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    try {
      // setLoading(true);
      let kodeAccount = account.split(" ", 1)[0];
      let namaAccount = account.split("-")[1];
      await axios.post(`${tempUrl}/aJurnalUmums`, {
        noJurnalUmum: jurnalUmums.noJurnalUmum,
        tanggal,
        kodeAccount,
        namaAccount,
        keterangan,
        debet,
        kredit
      });
      await axios.patch(`${tempUrl}/jurnalUmums/${id}`, {
        totalDebet: jurnalUmums.totalDebet + parseInt(debet),
        totalKredit: jurnalUmums.totalKredit + parseInt(kredit),
        balance: jurnalUmums.balance + (debet - kredit)
      });
      setLoading(false);
      navigate(
        `/daftarJurnalUmum/jurnalUmum/${id}/${jurnalUmums.noJurnalUmum}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ pt: 10 }}>
      <Typography color="#757575">Jurnal Umum</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Entry Jurnal Buku Besar
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
                Kode Buku Besar
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={bukuBesarOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register("kodeAccount", {
                      required: "Kode Account harus diisi!"
                    })}
                    error={!!errors?.kodeAccount}
                    helperText={
                      errors?.kodeAccount ? errors.kodeAccount.message : null
                    }
                  />
                )}
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                onInputChange={(e, value) => setAccount(value)}
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography sx={{ margin: 1, fontWeight: "500" }}>
                Tanggal
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={tanggal}
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                {...register("tanggal", {
                  required: "Tanggal harus diisi!"
                })}
                error={!!errors?.tanggal}
                helperText={errors?.tanggal ? errors.tanggal.message : null}
                onChange={(e) => setTanggal(e.target.value)}
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography sx={{ margin: 1, fontWeight: "500" }}>
                Keterangan
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={keterangan}
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                onChange={(e) => setKeterangan(e.target.value)}
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography sx={{ margin: 1, fontWeight: "500" }}>
                Debet Rp.
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={debet}
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                onChange={(e) => setDebet(e.target.value)}
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography sx={{ margin: 1, fontWeight: "500" }}>
                Kredit Rp.
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={kredit}
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                onChange={(e) => setKredit(e.target.value)}
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

export default TambahAJurnalUmum;
