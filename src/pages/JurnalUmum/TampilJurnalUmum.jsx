import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Divider,
  Button,
  ButtonGroup
} from "@mui/material";
import { ShowTableJurnalUmum } from "../../components/ShowTable";
import { Loader, ButtonModifierForJurnalUmum } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import { useStateContext } from "../../contexts/ContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import DownloadIcon from "@mui/icons-material/Download";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const TampilJurnalUmum = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const { noJU } = useParams();
  const { screenSize } = useStateContext();
  const [noJurnalUmum, setNoJurnalUmum] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [totalDebet, setTotalDebet] = useState("");
  const [totalKredit, setTotalKredit] = useState("");
  const [balance, setBalance] = useState("");
  const [aJurnalUmums, setAJurnalUmums] = useState([]);
  const [aJurnalUmumForDoc, setAJurnalUmumForDoc] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { title: "Kode Account", field: "kodeAccount" },
    { title: "Nama Account", field: "namaAccount" },
    { title: "Keterangan", field: "keterangan" },
    { title: "Debet", field: "debet" },
    { title: "Kredit", field: "kredit" }
  ];

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAJurnalUmums();
    id && getUserById();
    getAJurnalUmumForDoc();
  }, [id]);

  const getAJurnalUmums = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/aJurnalUmums/${noJU}`);
    setAJurnalUmums(response.data);
    setLoading(false);
  };

  const getAJurnalUmumForDoc = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/aJurnalUmumByNota/${noJU}`);
    setAJurnalUmumForDoc(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    setLoading(true);
    if (id) {
      const response = await axios.get(`${tempUrl}/jurnalUmums/${id}`);
      setNoJurnalUmum(response.data.noJurnalUmum);
      setTanggal(response.data.tanggal);
      setTotalDebet(response.data.totalDebet);
      setTotalKredit(response.data.totalKredit);
      setBalance(response.data.balance);
    }
    setLoading(false);
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${tempUrl}/jurnalUmums/${id}`);
      setLoading(false);
      navigate("/daftarJurnalUmum");
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`PT INDUSTRI CONTOH`, 15, 10);
    doc.text(`Jl. Kom Laut Yos Sudarso - Sumatera Utara`, 15, 15);
    doc.setFontSize(16);
    doc.text(`BUKTI JURNAL`, 90, 30);
    doc.setFontSize(10);
    doc.text(`No.Bukti : ${noJurnalUmum}`, 15, 40);
    doc.text(`Tanggal : ${tanggal}`, 15, 45);
    doc.text(`Total Debet : ${totalDebet.toLocaleString()}`, 15, 50);
    doc.text(`Total Kredit : ${totalKredit.toLocaleString()}`, 15, 55);
    doc.autoTable({
      margin: { top: 60 },
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: aJurnalUmumForDoc
    });
    doc.save(`jurnalUmum-${noJurnalUmum}.pdf`);
  };

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(aJurnalUmumForDoc);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, `Jurnal Umum`);
    // Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    // Binary String
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    // Download
    XLSX.writeFile(workBook, `JurnalUmum-${noJurnalUmum}.xlsx`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ p: 2, pt: 5 }}>
      <Typography color="#757575">Laporan</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Jurnal Umum
      </Typography>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        <ButtonModifierForJurnalUmum
          id={id}
          kode={"test"}
          addLink={`/daftarJurnalUmum/jurnalUmum/${id}/tambahAJurnalUmum`}
          editLink={`/daftarJurnalUmum/jurnalUmum/${id}/edit`}
          deleteUser={deleteUser}
          aJurnalUmums={aJurnalUmums}
          user={user}
        />
      </Box>
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
      <Divider sx={{ pt: 4 }} />
      <Box
        sx={{
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
          <Box>
            <Typography sx={{ margin: 1, fontWeight: "500" }}>
              Nomor Jurnal Umum
            </Typography>
            <TextField
              id="outlined-basic"
              variant="filled"
              sx={{
                display: "flex",
                width: screenSize >= 650 ? "30rem" : "100%"
              }}
              InputProps={{
                readOnly: true
              }}
              value={noJurnalUmum}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography sx={{ margin: 1, fontWeight: "500" }}>
              Tanggal
            </Typography>
            <TextField
              id="outlined-basic"
              variant="filled"
              sx={{
                display: "flex",
                width: screenSize >= 650 ? "30rem" : "100%"
              }}
              InputProps={{
                readOnly: true
              }}
              value={tanggal}
            />
          </Box>
        </Box>
      </Box>
      <Divider sx={{ pt: 4 }} />
      <Box sx={{ pt: 4, display: "flex", justifyContent: "center" }}>
        <ShowTableJurnalUmum id={id} currentPosts={aJurnalUmums} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: screenSize >= 650 ? "row" : "column",
          justifyContent: "center"
        }}
      >
        <Box sx={{ marginTop: 2 }}>
          <TextField
            id="outlined-basic"
            label="Total Debet"
            variant="filled"
            sx={{
              display: "flex",
              flex: "1"
            }}
            InputProps={{
              readOnly: true
            }}
            value={totalDebet.toLocaleString()}
          />
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <TextField
            id="outlined-basic"
            label="Total Kredit"
            variant="filled"
            sx={{
              display: "flex",
              flex: "1"
            }}
            InputProps={{
              readOnly: true
            }}
            value={totalKredit.toLocaleString()}
          />
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <TextField
            id="outlined-basic"
            label="Balance"
            variant="filled"
            sx={{
              display: "flex",
              flex: "1"
            }}
            InputProps={{
              readOnly: true
            }}
            value={balance.toLocaleString()}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TampilJurnalUmum;
