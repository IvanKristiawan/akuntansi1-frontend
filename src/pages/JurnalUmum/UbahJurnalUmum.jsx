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
import EditIcon from "@mui/icons-material/Edit";

const UbahJurnalUmum = () => {
  const { screenSize } = useStateContext();
  const [noJurnalUmum, setNoJurnalUmum] = useState("");
  const [tanggal, setTanggal] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/jurnalUmums/${id}`);
    setNoJurnalUmum(response.data.noJurnalUmum);
    setTanggal(response.data.tanggal);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.patch(`${tempUrl}/jurnalUmums/${id}`, {
        noJurnalUmum,
        tanggal
      });
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
      <Typography color="#757575">Laporan</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Ubah Daftar Jurnal Umum
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
              value={noJurnalUmum}
              sx={{
                display: "flex",
                width: screenSize >= 650 ? "30rem" : "100%"
              }}
              onChange={(e) => setNoJurnalUmum(e.target.value)}
              InputProps={{
                readOnly: true
              }}
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
              onChange={(e) => setTanggal(e.target.value)}
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

export default UbahJurnalUmum;
