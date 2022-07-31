import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Divider, ButtonGroup, Button } from "@mui/material";
import { ShowNeracaSaldo } from "../../components/ShowTable";
import DownloadIcon from "@mui/icons-material/Download";
import { Loader } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const NeracaSaldo = () => {
  const [users, setUser] = useState([]);
  const [neracaSaldoForDoc, setNeracaSaldoForDoc] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: "Kode Account", field: "kodeAccount" },
    { title: "Nama Account", field: "namaAccount" },
    { title: "Saldo Debet", field: "debet" },
    { title: "Saldo Kredit", field: "kredit" }
  ];

  useEffect(() => {
    getUsers();
    getNeracaSaldoForDoc();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/neracaSaldos`);
    setUser(response.data);
    setLoading(false);
  };

  const getNeracaSaldoForDoc = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/neracaSaldoForDoc`);
    setNeracaSaldoForDoc(response.data);
    setLoading(false);
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`PT INDUSTRI CONTOH`, 15, 10);
    doc.text(`Jl. Kom Laut Yos Sudarso - Sumatera Utara`, 15, 15);
    doc.setFontSize(16);
    doc.text(`NERACA SALDO`, 90, 30);
    doc.setFontSize(12);
    doc.autoTable({
      margin: { top: 40 },
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: neracaSaldoForDoc
    });
    doc.save(`neracaSaldo.pdf`);
  };

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(neracaSaldoForDoc);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, `Neraca Saldo`);
    // Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    // Binary String
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    // Download
    XLSX.writeFile(workBook, `NeracaSaldo.xlsx`);
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
