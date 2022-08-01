import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
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
    doc.text(`LABA RUGI`, 90, 30);
    doc.setFontSize(10);
    doc.line(15, y, 200, y);
    y += 5;
    doc.text(`Kode`, 43, y);
    doc.text(`Akun`, 110, y);
    doc.text(`Total`, 170, y);
    y += 3;
    doc.line(15, y, 200, y);
    y += 9;
    doc.setFont(undefined, "bold");
    doc.text(`Pendapatan dari Penjualan`, x1, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);
    y += 5;
    labaRugiTransaksiAll.map((val) => {
      if (val.kodeAccount === "30101") {
        doc.text(`${val.kodeAccount}`, x1 + 5, y);
        doc.text(`${val.namaAccount}`, x2, y);
        doc.text(`Rp ${val.total}`, x3, y);
      }
    });
    y += 3;
    doc.line(15, y, 200, y);
    y += 5;
    doc.setFont(undefined, "bold");
    doc.text(`Total Pendapatan dari Penjualan`, x1, y);
    doc.text(`Rp ${users[0].totalPendapatan.toLocaleString()}`, x3, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);
    y += 9;
    doc.setFont(undefined, "bold");
    doc.text(`Harga Pokok Penjualan`, x1, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);
    y += 5;
    labaRugiTransaksiAll.map((val) => {
      if (val.kodeAccount === "30401") {
        doc.text(`${val.kodeAccount}`, x1 + 5, y);
        doc.text(`${val.namaAccount}`, x2, y);
        doc.text(`Rp ${val.total}`, x3, y);
      }
    });
    y += 3;
    doc.line(15, y, 200, y);
    y += 5;
    doc.setFont(undefined, "bold");
    doc.text(`Total Harga Pokok Penjualan`, x1, y);
    doc.text(`Rp ${users[0].totalHPP.toLocaleString()}`, x3, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);
    y += 5;
    doc.setFont(undefined, "bold");
    doc.text(`Laba Kotor`, x1, y);
    doc.text(`Rp ${users[0].labaKotor.toLocaleString()}`, x3, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);
    y += 9;
    doc.setFont(undefined, "bold");
    doc.text(`Beban Operasional`, x1, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);
    labaRugiTransaksiAll.map((val) => {
      if (val.kelompokAccount === "310") {
        y += 5;
        doc.text(`${val.kodeAccount}`, x1 + 5, y);
        doc.text(`${val.namaAccount}`, x2, y);
        doc.text(`Rp ${val.total}`, x3, y);
        y += 3;
        doc.line(15, y, 200, y);
      }
    });
    y += 5;
    doc.setFont(undefined, "bold");
    doc.text(`Total Beban Operasional`, x1, y);
    doc.text(`Rp ${users[0].totalBebanOperasional.toLocaleString()}`, x3, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);
    y += 5;
    doc.setFont(undefined, "bold");
    doc.text(`Laba Bersih`, x1, y);
    doc.text(`Rp ${users[0].labaBersih.toLocaleString()}`, x3, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);

    // Vertical Line
    doc.line(15, 35, 15, y);
    doc.line(200, 35, 200, y);
    doc.line(148, 35, 148, y);
    doc.line(80, 35, 80, y);
    doc.save(`labaRugi.pdf`);
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
