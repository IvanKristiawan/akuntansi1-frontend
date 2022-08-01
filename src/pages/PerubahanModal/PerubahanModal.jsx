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

const PerubahanModal = () => {
  const [users, setUser] = useState([]);
  const [perubahanModalForDoc, setPerubahanModalForDoc] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
    getPerubahanModalForDoc();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/perubahanModalLast`);
    setUser(response.data);
    setLoading(false);
  };

  const getPerubahanModalForDoc = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/perubahanModalForDoc`);
    setPerubahanModalForDoc(response.data);
    setLoading(false);
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.setDrawColor(0, 0, 255);
    doc.text(`PT INDUSTRI CONTOH`, 15, 10);
    doc.text(`Jl. Kom Laut Yos Sudarso - Sumatera Utara`, 15, 15);
    doc.setFontSize(16);
    doc.text(`PERUBAHAN MODAL`, 90, 30);
    doc.setFontSize(10);
    doc.line(15, 35, 200, 35);
    doc.text(`Modal Saham`, 15, 40);
    doc.text(`Rp ${users[0].modalSaham.toLocaleString()}`, 15, 45);
    doc.line(15, 50, 200, 50);
    doc.text(`Laba Bersih`, 15, 55);
    doc.text(`Rp ${users[0].labaBersih.toLocaleString()}`, 15, 60);
    doc.line(15, 65, 200, 65);
    doc.text(`Total Modal`, 15, 70);
    doc.text(`Rp ${users[0].total.toLocaleString()}`, 15, 75);
    doc.line(15, 80, 200, 80);
    doc.setFontSize(12);
    doc.save(`perubahanModal.pdf`);
  };

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(perubahanModalForDoc);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, `Perubahan Modal`);
    // Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    // Binary String
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    // Download
    XLSX.writeFile(workBook, `perubahanModal.xlsx`);
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

      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        <ButtonGroup variant="text" color="secondary">
          <Button startIcon={<DownloadIcon />} onClick={() => downloadPdf()}>
            PDF
          </Button>
          <Button startIcon={<DownloadIcon />} onClick={() => downloadExcel()}>
            EXCEL
          </Button>
        </ButtonGroup>
      </Box>

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
                    <Typography
                      sx={{ pl: 2, fontWeight: "bold", fontSize: "14px" }}
                    >
                      Modal
                    </Typography>
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

export default PerubahanModal;
