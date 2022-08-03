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
import { ShowNeraca } from "../../components/ShowTable";
import { Loader } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import DownloadIcon from "@mui/icons-material/Download";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const Neraca = () => {
  const [users, setUser] = useState([]);
  const [hartaLancar, setHartaLancar] = useState([]);
  const [hartaTetap, setHartaTetap] = useState([]);
  const [kewajiban, setKewajiban] = useState([]);
  const [modal, setModal] = useState([]);
  const [modalForDoc, setModalForDoc] = useState([]);
  const [totalHartaLancar, setTotalHartaLancar] = useState(0);
  const [totalHartaTetap, setTotalHartaTetap] = useState(0);
  const [totalHarta, setTotalHarta] = useState(0);
  const [totalKewajiban, setTotalKewajiban] = useState(0);
  const [totalModal, setTotalModal] = useState(0);
  const [totalKewajibanModal, setTotalKewajibanModal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/neracaLast`);
    setUser(response.data);
    // Get Harta
    const getHarta = await axios.get(
      `${tempUrl}/hartas/${response.data[0].idHarta}`
    );
    setTotalHartaLancar(getHarta.data.totalHartaLancar);
    setTotalHartaTetap(getHarta.data.totalHartaTetap);
    setTotalHarta(getHarta.data.totalHarta);
    // Get Harta Lancar
    const getHartaLancar = await axios.get(`${tempUrl}/hartaLancarAllForDoc`);
    setHartaLancar(getHartaLancar.data);
    // Get Harta Tetap
    const getHartaTetap = await axios.get(`${tempUrl}/hartaTetapAllForDoc`);
    setHartaTetap(getHartaTetap.data);
    // Get Kewajiban
    const getKewajiban = await axios.get(`${tempUrl}/kewajibanLast`);
    setTotalKewajiban(getKewajiban.data[0].totalKewajiban);
    // Get Kewajiban All
    const getKewajibanAll = await axios.get(`${tempUrl}/kewajibanAllForDoc`);
    setKewajiban(getKewajibanAll.data);
    // Get Modal
    const getModal = await axios.get(`${tempUrl}/perubahanModalLast`);
    const getModalForDoc = await axios.get(`${tempUrl}/perubahanModalForDoc`);
    setModalForDoc(getModalForDoc.data);
    setModal(getModal.data[0]);
    setTotalModal(getModal.data[0].total);
    setTotalKewajibanModal(
      getKewajiban.data[0].totalKewajiban + getModal.data[0].total
    );
    // Post Total
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
    doc.text(`NERACA`, 90, 30);
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
    doc.text(`Harta`, x1, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);
    y += 7;
    doc.setFont(undefined, "bold");
    doc.text(`Harta Lancar`, x1 + 5, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);
    hartaLancar.map((val) => {
      y += 5;
      doc.text(`${val.kodeAccount}`, x1 + 10, y);
      doc.text(`${val.namaAccount}`, x2, y);
      doc.text(`Rp ${val.total}`, x3, y);
      y += 3;
      doc.line(15, y, 200, y);
    });
    y += 5;
    doc.setFont(undefined, "bold");
    doc.text(`Total Harta Lancar`, x1 + 5, y);
    doc.text(`Rp ${totalHartaLancar.toLocaleString()}`, x3, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);
    y += 7;
    doc.setFont(undefined, "bold");
    doc.text(`Harta Tetap`, x1 + 5, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);
    hartaTetap.map((val) => {
      y += 5;
      doc.text(`${val.kodeAccount}`, x1 + 10, y);
      doc.text(`${val.namaAccount}`, x2, y);
      doc.text(`Rp ${val.total}`, x3, y);
      y += 3;
      doc.line(15, y, 200, y);
    });
    y += 5;
    doc.setFont(undefined, "bold");
    doc.text(`Total Harta Tetap`, x1 + 5, y);
    doc.text(`Rp ${totalHartaTetap.toLocaleString()}`, x3, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);
    y += 5;
    doc.setFont(undefined, "bold");
    doc.text(`Total Harta`, x1, y);
    doc.text(`Rp ${totalHarta.toLocaleString()}`, x3, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);
    y += 9;
    doc.setFont(undefined, "bold");
    doc.text(`Kewajiban dan Modal`, x1, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);
    y += 7;
    doc.setFont(undefined, "bold");
    doc.text(`Kewajiban`, x1 + 5, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);
    kewajiban.map((val) => {
      y += 5;
      doc.text(`${val.kodeAccount}`, x1 + 10, y);
      doc.text(`${val.namaAccount}`, x2, y);
      doc.text(`Rp ${val.total}`, x3, y);
      y += 3;
      doc.line(15, y, 200, y);
    });
    y += 5;
    doc.setFont(undefined, "bold");
    doc.text(`Total Kewajiban`, x1 + 5, y);
    doc.text(`Rp ${totalKewajiban.toLocaleString()}`, x3, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);
    y += 7;
    doc.setFont(undefined, "bold");
    doc.text(`Modal`, x1 + 5, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);
    y += 5;
    doc.text(``, x1 + 10, y);
    doc.text(`Laba Bersih`, x2, y);
    doc.text(`Rp ${modal.labaBersih.toLocaleString()}`, x3, y);
    y += 3;
    doc.line(15, y, 200, y);
    y += 5;
    doc.text(`22001`, x1 + 10, y);
    doc.text(`Modal Saham`, x2, y);
    doc.text(`Rp ${modal.modalSaham.toLocaleString()}`, x3, y);
    y += 3;
    doc.line(15, y, 200, y);
    y += 5;
    doc.setFont(undefined, "bold");
    doc.text(`Total Modal`, x1 + 5, y);
    doc.text(`Rp ${totalModal.toLocaleString()}`, x3, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);
    y += 5;
    doc.setFont(undefined, "bold");
    doc.text(`Total Kewajiban dan Modal`, x1, y);
    doc.text(`Rp ${totalKewajibanModal.toLocaleString()}`, x3, y);
    doc.setFont(undefined, "normal");
    y += 3;
    doc.line(15, y, 200, y);

    // Vertical Line
    doc.line(15, 35, 15, y);
    doc.line(200, 35, 200, y);
    doc.line(148, 35, 148, y);
    doc.line(80, 35, 80, y);
    doc.save(`neraca.pdf`);
  };

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(hartaLancar);
    const workSheet2 = XLSX.utils.json_to_sheet(hartaTetap);
    const workSheet3 = XLSX.utils.json_to_sheet(kewajiban);
    const workSheet4 = XLSX.utils.json_to_sheet(modalForDoc);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, `Harta Lancar`);
    XLSX.utils.book_append_sheet(workBook, workSheet2, `Harta Tetap`);
    XLSX.utils.book_append_sheet(workBook, workSheet3, `Kewajiban`);
    XLSX.utils.book_append_sheet(workBook, workSheet4, `Modal`);
    // Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    // Binary String
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    // Download
    XLSX.writeFile(workBook, `Neraca.xlsx`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ p: 2, pt: 5 }}>
      <Typography color="#757575">Laporan</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Neraca
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
                    Harta
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
                      Harta Lancar
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                {hartaLancar.map((val, index) => (
                  <>
                    <ShowNeraca
                      currentPosts={user}
                      kode={val.kodeAccount}
                      nama={val.namaAccount}
                      total={val.total}
                    />
                  </>
                ))}
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
                      Total Harta Lancar
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Rp {totalHartaLancar.toLocaleString()}
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
                    <Typography
                      sx={{ pl: 2, fontWeight: "bold", fontSize: "14px" }}
                    >
                      Harta Tetap
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                {hartaTetap.map((val, index) => (
                  <>
                    <ShowNeraca
                      currentPosts={user}
                      kode={val.kodeAccount}
                      nama={val.namaAccount}
                      total={val.total}
                    />
                  </>
                ))}
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
                      Total Harta Tetap
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Rp {totalHartaTetap.toLocaleString()}
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
                    Total Harta
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Rp {totalHarta.toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "#eeeeee" },
                    cursor: "pointer"
                  }}
                >
                  <TableCell component="th" scope="row"></TableCell>
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
                    Kewajiban dan Modal
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
                      Kewajiban
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                {kewajiban.map((val, index) => (
                  <>
                    <ShowNeraca
                      currentPosts={user}
                      kode={val.kodeAccount}
                      nama={val.namaAccount}
                      total={val.total}
                    />
                  </>
                ))}
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
                      Total Kewajiban
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Rp {totalKewajiban.toLocaleString()}
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
                    <Typography
                      sx={{ pl: 2, fontWeight: "bold", fontSize: "14px" }}
                    >
                      Modal
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <ShowNeraca
                  currentPosts={user}
                  kode=""
                  nama="Laba Bersih"
                  total={modal.labaBersih}
                />
                <ShowNeraca
                  currentPosts={user}
                  kode="22001"
                  nama="Modal Saham"
                  total={modal.modalSaham}
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
                    <Typography
                      sx={{ pl: 2, fontWeight: "bold", fontSize: "14px" }}
                    >
                      Total Modal
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Rp {totalModal.toLocaleString()}
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
                    Total Kewajiban dan Modal
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Rp {totalKewajibanModal.toLocaleString()}
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
