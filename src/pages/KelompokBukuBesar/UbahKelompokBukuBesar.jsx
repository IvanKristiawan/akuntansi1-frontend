import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { tempUrl } from "../../contexts/ContextProvider";
import { Loader } from "../../components";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useStateContext } from "../../contexts/ContextProvider";

const UbahKelompokBukuBesar = () => {
  const { screenSize } = useStateContext();
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/kelompokBukuBesars/${id}`);
    setKode(response.data.kode);
    setNama(response.data.nama);
    setJenis(response.data.jenis);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.patch(`${tempUrl}/kelompokBukuBesars/${id}`, {
        kode,
        nama,
        jenis
      });
      setLoading(false);
      navigate(`/kelompokBukuBesar/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ pt: 10 }}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Ubah Kelompok Buku Besar
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
          <Box>
            <Typography sx={{ margin: 1, fontWeight: "500" }}>Nama</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={nama}
              sx={{
                display: "flex",
                width: screenSize >= 650 ? "30rem" : "100%"
              }}
              onChange={(e) => setNama(e.target.value)}
            />
          </Box>
          <Box>
            <Typography sx={{ margin: 1, fontWeight: "500" }}>Jenis</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={jenis}
              sx={{
                display: "flex",
                width: screenSize >= 650 ? "30rem" : "100%"
              }}
              onChange={(e) => setJenis(e.target.value)}
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

export default UbahKelompokBukuBesar;
