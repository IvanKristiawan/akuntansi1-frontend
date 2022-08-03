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
    let y = 35;
    let x1 = 20;
    let x2 = 82;
    let x3 = 150;
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.setDrawColor(101, 101, 101);
    doc.text(`PT INDUSTRI CONTOH`, 15, 10);
    doc.text(`Jl. Kom Laut Yos Sudarso - Sumatera Utara`, 15, 15);
    doc.setFontSize(16);
    doc.text(`PERUBAHAN MODAL`, 90, 30);
    doc.setFontSize(10);
    doc.line(15, y, 200, y);
    y += 5;
    y += 3;
    doc.line(15, y, 200, y);
    y += 9;
    doc.setFont(undefined, "bold");
    doc.text(`Modal`, x1, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);
    y += 5;
    doc.text(`Modal Saham - 22001`, x1 + 5, y);
    doc.text(`Rp ${perubahanModalForDoc[0].modalSaham}`, x3, y);
    y += 3;
    doc.line(15, y, 200, y);
    y += 5;
    doc.text(`Laba Bersih`, x1 + 5, y);
    doc.text(`Rp ${perubahanModalForDoc[0].labaBersih}`, x3, y);
    y += 3;
    doc.line(15, y, 200, y);
    y += 5;
    doc.setFont(undefined, "bold");
    doc.text(`Total Modal`, x1, y);
    doc.text(`Rp ${perubahanModalForDoc[0].total}`, x3, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);

    // Vertical Line
    doc.line(15, 35, 15, y);
    doc.line(200, 35, 200, y);
    doc.line(148, 35, 148, y);
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
    <Box sx={{ p: 2, pt: 5 }}>
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
