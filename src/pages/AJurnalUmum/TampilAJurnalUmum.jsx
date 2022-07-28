import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, TextField, Typography, Divider, Button } from "@mui/material";
import { Loader } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import { useStateContext } from "../../contexts/ContextProvider";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const TampilAJurnalUmum = () => {
  const { id, idAJurnalUmum } = useParams();
  const navigate = useNavigate();
  const { screenSize } = useStateContext();
  const [idLaporanBukuBesar, setIdLaporanBukuBesar] = useState("");
  const [noJurnalUmum, setNoJurnalUmum] = useState("");
  const [kodeAccount, setKodeAccount] = useState("");
  const [namaAccount, setNamaAccount] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [debet, setDebet] = useState(0);
  const [kredit, setKredit] = useState(0);
  const [jurnalUmum, setJurnalUmum] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getJurnalUmum();
    getUserById();
  }, []);

  const getUserById = async () => {
    if (id) {
      setLoading(true);
      const response = await axios.get(
        `${tempUrl}/aJurnalUmum/${idAJurnalUmum}`
      );
      setIdLaporanBukuBesar(response.data.idLaporanBukuBesar);
      setNoJurnalUmum(response.data.noJurnalUmum);
      setTanggal(response.data.tanggal);
      setNamaAccount(response.data.namaAccount);
      setKodeAccount(response.data.kodeAccount);
      setKeterangan(response.data.keterangan);
      setDebet(response.data.debet);
      setKredit(response.data.kredit);
      setLoading(false);
    }
  };

  const getJurnalUmum = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/jurnalUmums/${id}`);
    setJurnalUmum(response.data);
    setLoading(false);
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      const newDebet = parseInt(jurnalUmum.totalDebet) - parseInt(debet);
      const newKredit = parseInt(jurnalUmum.totalKredit) - parseInt(kredit);
      await axios.patch(`${tempUrl}/jurnalUmums/${jurnalUmum._id}`, {
        totalDebet: newDebet,
        totalKredit: newKredit,
        balance: jurnalUmum.balance - (debet - kredit)
      });
      await axios.delete(`${tempUrl}/aJurnalUmums/${idAJurnalUmum}`);
      await axios.delete(`${tempUrl}/laporanBukuBesars/${idLaporanBukuBesar}`);
      setNoJurnalUmum("");
      setTanggal("");
      setNamaAccount("");
      setKodeAccount("");
      setKeterangan("");
      setDebet(0);
      setKredit(0);
      setLoading(false);
      navigate(`/daftarJurnalUmum/jurnalUmum/${id}/${noJurnalUmum}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ pt: 5 }}>
      <Typography color="#757575">Jurnal Umum</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Entry Jurnal Buku Besar
      </Typography>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteOutlineIcon />}
          sx={{ textTransform: "none" }}
          onClick={() => deleteUser(id)}
        >
          Hapus
        </Button>
      </Box>
      <Divider sx={{ pt: 4 }} />
      <Box
        sx={{
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
            <TextField
              id="outlined-basic"
              variant="filled"
              sx={{
                display: "flex",
                width: screenSize >= 650 ? "30rem" : "100%"
              }}
              InputProps={{
                readOnly: true
              }}
              value={`${kodeAccount} - ${namaAccount}`}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography sx={{ margin: 1, fontWeight: "500" }}>
              Tanggal
            </Typography>
            <TextField
              id="outlined-basic"
              variant="filled"
              sx={{
                display: "flex",
                width: screenSize >= 650 ? "30rem" : "100%"
              }}
              InputProps={{
                readOnly: true
              }}
              value={tanggal}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography sx={{ margin: 1, fontWeight: "500" }}>
              Keterangan
            </Typography>
            <TextField
              id="outlined-basic"
              variant="filled"
              sx={{
                display: "flex",
                width: screenSize >= 650 ? "30rem" : "100%"
              }}
              InputProps={{
                readOnly: true
              }}
              value={keterangan}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography sx={{ margin: 1, fontWeight: "500" }}>
              Debet Rp.
            </Typography>
            <TextField
              id="outlined-basic"
              variant="filled"
              sx={{
                display: "flex",
                width: screenSize >= 650 ? "30rem" : "100%"
              }}
              InputProps={{
                readOnly: true
              }}
              value={debet.toLocaleString()}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography sx={{ margin: 1, fontWeight: "500" }}>
              Kredit Rp.
            </Typography>
            <TextField
              id="outlined-basic"
              variant="filled"
              sx={{
                display: "flex",
                width: screenSize >= 650 ? "30rem" : "100%"
              }}
              InputProps={{
                readOnly: true
              }}
              value={kredit.toLocaleString()}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TampilAJurnalUmum;
