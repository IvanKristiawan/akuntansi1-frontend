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
import EditIcon from "@mui/icons-material/Edit";
import { useStateContext } from "../../contexts/ContextProvider";

const UbahBukuBesar = () => {
  const { screenSize } = useStateContext();
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [kelompok, setKelompok] = useState("");
  const [jenisSaldo, setJenisSaldo] = useState("");
  const [jenis, setJenis] = useState("");
  const [kelompokBukuBesar, setKelompokBukuBesar] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const optionJenisSaldo = [{ label: "DEBET" }, { label: "KREDIT" }];

  const optionJenis = [{ label: "KAS/BANK" }, { label: "NON KAS/BANK" }];

  // optionKelompokBukuBesar
  const optionKelompokBukuBesar = kelompokBukuBesar.map((val) => ({
    label: `${val.kode} - ${val.nama}`
  }));

  useEffect(() => {
    getUsers();
    getUserById();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/kelompokBukuBesarKodeNama`);
    setKelompokBukuBesar(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/bukuBesars/${id}`);
    setKode(response.data.kode);
    setNama(response.data.nama);
    setKelompok(response.data.kelompok);
    setJenisSaldo(response.data.jenisSaldo);
    setJenis(response.data.jenis);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.patch(`${tempUrl}/bukuBesars/${id}`, {
        kode,
        nama,
        kelompok,
        jenisSaldo,
        jenis
      });
      setLoading(false);
      navigate(`/bukuBesar/${id}`);
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
        Ubah Daftar Buku Besar
      </Typography>
      <Divider sx={{ mt: 2 }} />
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
            <Typography sx={{ margin: 1, fontWeight: "500" }}>Kode</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={kode}
              sx={{
                display: "flex",
                width: screenSize >= 650 ? "30rem" : "100%"
              }}
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
              renderInput={(params) => <TextField {...params} />}
              onInputChange={(e, value) => setKelompok(value.split(" ", 1)[0])}
              defaultValue={{ label: kelompok }}
              sx={{
                display: "flex",
                width: screenSize >= 650 ? "30rem" : "100%"
              }}
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
              renderInput={(params) => <TextField {...params} />}
              defaultValue={{ label: jenisSaldo }}
              onInputChange={(e, value) => setJenisSaldo(value)}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography sx={{ margin: 1, fontWeight: "500" }}>Jenis</Typography>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={optionJenis}
              sx={{
                display: "flex",
                width: screenSize >= 650 ? "30rem" : "100%"
              }}
              renderInput={(params) => <TextField {...params} />}
              defaultValue={{ label: jenis }}
              onInputChange={(e, value) => setJenis(value)}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={updateUser}
        >
          Ubah
        </Button>
      </Box>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default UbahBukuBesar;
