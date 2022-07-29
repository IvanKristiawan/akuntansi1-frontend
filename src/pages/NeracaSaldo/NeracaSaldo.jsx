import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Divider } from "@mui/material";
import { ShowNeracaSaldo } from "../../components/ShowTable";
import { Loader } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";

const NeracaSaldo = () => {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/neracaSaldos`);
    setUser(response.data);
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ pt: 5 }}>
      <Typography color="#757575">Laporan</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Neraca Saldo
      </Typography>

      {users.map((user, index) => (
        <>
          <Divider sx={{ pt: 4 }} />
          <Typography variant="h6" sx={{ fontWeight: "500", pt: 2 }}>
            {user.kodeAccount} - {user.namaAccount}
          </Typography>
          <Box sx={{ pt: 2, display: "flex", justifyContent: "center" }}>
            <ShowNeracaSaldo
              currentPosts={users}
              kodeBukuBesar={user.kodeAccount}
            />
          </Box>
        </>
      ))}
    </Box>
  );
};

export default NeracaSaldo;
