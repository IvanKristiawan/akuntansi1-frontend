import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Divider } from "@mui/material";
import { ShowLaporanBukuBesar } from "../../components/ShowTable";

import { Loader } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";

const LaporanBukuBesar = () => {
  const [users, setUser] = useState([]);
  const [tempBukuBesar, setTempBukuBesar] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
    getBukuBesars();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/laporanBukuBesars`);
    setUser(response.data);
    setLoading(false);
  };

  const getBukuBesars = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/bukuBesars`);
    setTempBukuBesar(response.data);
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ pt: 5 }}>
      <Typography color="#757575">Laporan</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Buku Besar
      </Typography>

      {tempBukuBesar
        .filter((val) => {
          for (let i = 0; i < users.length; i++) {
            if (users[i].kodeBukuBesar === val.kode) {
              return val;
            }
          }
        })
        .map((user, index) => (
          <>
            <Divider sx={{ pt: 4 }} />
            <Typography variant="h6" sx={{ fontWeight: "500", pt: 2 }}>
              {user.nama} - {user.kode}
            </Typography>
            <Box sx={{ pt: 2, display: "flex", justifyContent: "center" }}>
              <ShowLaporanBukuBesar
                currentPosts={users}
                kodeBukuBesar={user.kode}
                jenisSaldo={user.jenisSaldo}
              />
            </Box>
          </>
        ))}
    </Box>
  );
};

export default LaporanBukuBesar;
