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
import { ShowLabaRugi } from "../../components/ShowTable";
import { Loader } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import DownloadIcon from "@mui/icons-material/Download";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const LabaRugi = () => {
  const [users, setUser] = useState([]);
  const [labaRugiTotal, setLabaRugiTotal] = useState([]);
  const [labaRugiTransaksiAll, setLabaRugiTransaksiAll] = useState([]);
  const [labaRugiTransaksiAllForDoc, setLabaRugiTransaksiAllForDoc] = useState(
    []
  );
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: "Kode", field: "kodeAccount" },
    { title: "Akun", field: "namaAccount" },
    { title: "Total", field: "total" }
  ];

  useEffect(() => {
    getUsers();
    getLabaRugiTotal();
    getLabaRugiTransaksiAll();
    getLabaRugiTransaksiAllForDoc();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/labaRugiLast`);
    setUser(response.data);
    setLoading(false);
  };

  const getLabaRugiTransaksiAll = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/labaRugiTransaksiAll`);
    setLabaRugiTransaksiAll(response.data);
    setLoading(false);
  };

  const getLabaRugiTransaksiAllForDoc = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/labaRugiTransaksiAllForDoc`);
    setLabaRugiTransaksiAllForDoc(response.data);
    setLoading(false);
  };

  const getLabaRugiTotal = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/labaRugiTotal`);
    setLabaRugiTotal(response.data);
    setLoading(false);
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.setDrawColor(0, 0, 255);
    doc.text(`PT INDUSTRI CONTOH`, 15, 10);
    doc.text(`Jl. Kom Laut Yos Sudarso - Sumatera Utara`, 15, 15);
    doc.setFontSize(16);
    doc.text(`LABA RUGI`, 90, 30);
    doc.setFontSize(10);
    doc.line(15, 35, 200, 35);
    doc.text(`Total Pendapatan dari Penjualan`, 15, 40);
    doc.text(`Rp ${users[0].totalPendapatan.toLocaleString()}`, 15, 45);
    doc.line(15, 50, 200, 50);
    doc.text(`Total Harga Pokok Penjualan`, 15, 55);
    doc.text(`Rp ${users[0].totalHPP.toLocaleString()}`, 15, 60);
    doc.line(15, 65, 200, 65);
    doc.text(`Laba Kotor`, 15, 70);
    doc.text(`Rp ${users[0].labaKotor.toLocaleString()}`, 15, 75);
    doc.line(15, 80, 200, 80);
    doc.text(`Total Beban Operasional`, 15, 85);
    doc.text(`Rp ${users[0].totalBebanOperasional.toLocaleString()}`, 15, 90);
    doc.line(15, 95, 200, 95);
    doc.text(`Laba Bersih`, 15, 100);
    doc.text(`Rp ${users[0].labaBersih.toLocaleString()}`, 15, 105);
    doc.line(15, 110, 200, 110);
    doc.setFontSize(12);
    doc.autoTable({
      margin: { top: 115 },
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: labaRugiTransaksiAll
    });
    doc.save(`neracaSaldo.pdf`);
  };

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(labaRugiTransaksiAllForDoc);
    const workSheet2 = XLSX.utils.json_to_sheet(labaRugiTotal);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, `Transaksi`);
    XLSX.utils.book_append_sheet(workBook, workSheet2, `Total Laba Rugi`);
    // Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    // Binary String
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    // Download
    XLSX.writeFile(workBook, `LabaRugi.xlsx`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ pt: 5 }}>
      <Typography color="#757575">Laporan</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Laba Rugi
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
                    Pendapatan dari Penjualan
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <ShowLabaRugi
                  currentPosts={user.transaksi}
                  kelompokAccount="301"
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
                    Total Pendapatan dari Penjualan
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Rp {user.totalPendapatan.toLocaleString()}
                  </TableCell>
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
                    Harga Pokok Penjualan
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <ShowLabaRugi
                  currentPosts={user.transaksi}
                  kelompokAccount="304"
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
                    Total Harga Pokok Penjualan
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Rp {user.totalHPP.toLocaleString()}
                  </TableCell>
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
                    Laba Kotor
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Rp {user.labaKotor.toLocaleString()}
                  </TableCell>
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
                    Beban Operasional
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <ShowLabaRugi
                  currentPosts={user.transaksi}
                  kelompokAccount="310"
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
                    Total Beban Operasional
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Rp {user.totalBebanOperasional.toLocaleString()}
                  </TableCell>
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
                    Laba Bersih
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Rp {user.labaBersih.toLocaleString()}
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

export default LabaRugi;
