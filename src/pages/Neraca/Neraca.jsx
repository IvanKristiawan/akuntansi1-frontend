import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Divider,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ButtonGroup,
  Button
} from "@mui/material";
import { ShowPerubahanModal } from "../../components/ShowTable";
import { Loader } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import DownloadIcon from "@mui/icons-material/Download";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const Neraca = () => {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/perubahanModalLast`);
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
        Perubahan Modal
      </Typography>

      {users.map((user, index) => (
        <>
          <TableContainer component={Paper} sx={{ width: "100%" }}>
            <Table aria-label="simple table">
              <colgroup>
                <col style={{ width: "30%" }} />
                <col style={{ width: "30%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <TableHead>
                <TableRow>
                  <TableCell>Kode</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "#eeeeee" },
                    cursor: "pointer"
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold" }}
                  >
                    Perubahan Modal
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "#eeeeee" },
                    cursor: "pointer"
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold" }}
                  >
                    Modal
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <ShowPerubahanModal
                  currentPosts={user}
                  kode="22001"
                  nama="Modal Saham"
                />
                <ShowPerubahanModal
                  currentPosts={user}
                  kode=""
                  nama="Laba Bersih"
                />
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "#eeeeee" },
                    cursor: "pointer"
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold" }}
                  >
                    Total Modal
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Rp {user.total.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ))}
    </Box>
  );
};

export default Neraca;
