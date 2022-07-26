import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Divider,
  Pagination,
  Button,
  ButtonGroup
} from "@mui/material";
import { ShowTableJurnalUmum } from "../../components/ShowTable";
import { Loader, usePagination, ButtonModifier } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import { useStateContext } from "../../contexts/ContextProvider";
import DownloadIcon from "@mui/icons-material/Download";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TampilJurnalUmum = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const { screenSize } = useStateContext();
  const [noJurnalUmum, setNoJurnalUmum] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [totalDebet, setTotalDebet] = useState("");
  const [totalKredit, setTotalKredit] = useState("");
  const [balance, setBalance] = useState("");
  const [aJurnalUmums, setAJurnalUmums] = useState([]);
  const [aJurnalUmumForDoc, setAJurnalUmumForDoc] = useState([]);
  const [aJurnalUmumForDocDisplay, setAJurnalUmumForDocDisplay] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { title: "Tanggal", field: "tanggal" },
    { title: "Kode Account", field: "kodeAccount" },
    { title: "Nama Account", field: "namaAccount" },
    { title: "Keterangan", field: "keterangan" },
    { title: "Debet", field: "debet" },
    { title: "Kredit", field: "kredit" }
  ];

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  // Get current posts
  const indexOfLastPost = page * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;
  const currentPosts = aJurnalUmums.slice(indexOfFirstPost, indexOfLastPost);

  const count = Math.ceil(aJurnalUmums.length / PER_PAGE);
  const _DATA = usePagination(aJurnalUmums, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    getAJurnalUmums();
    getAJurnalUmumForDoc();
    id && getUserById();
  }, [id]);

  const getAJurnalUmums = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/aJurnalUmums`);
    setAJurnalUmums(response.data);
    setLoading(false);
  };

  const getAJurnalUmumForDoc = async () => {
    setLoading(true);
    let tempDebet;
    let tempKredit;
    const response = await axios.get(`${tempUrl}/aJurnalUmumForDoc`);
    setAJurnalUmumForDoc(response.data);
    for (let i = 0; i < aJurnalUmumForDoc.length; i++) {
      tempDebet = aJurnalUmumForDoc[i].debet.toLocaleString();
      tempKredit = aJurnalUmumForDoc[i].kredit.toLocaleString();
      aJurnalUmumForDoc[i].debet = tempDebet;
      aJurnalUmumForDoc[i].kredit = tempKredit;
    }
    setAJurnalUmumForDocDisplay(aJurnalUmumForDoc);
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
      for (let aJurnalUmum of aJurnalUmums) {
        if (aJurnalUmum.noJurnalUmum === noJurnalUmum) {
          let newTotalDebet = totalDebet - aJurnalUmum.totalDebet;
          let newTotalKredit = totalKredit - aJurnalUmum.totalKredit;
          await axios.patch(`${tempUrl}/jurnalUmums/${aJurnalUmum._id}`, {
            totalDebet: newTotalDebet,
            totalKredit: newTotalKredit
          });
        }
      }
      await axios.delete(`${tempUrl}/aJurnalUmums/${id}`);
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
    doc.text(`BUKTI JURNAL`, 80, 30);
    doc.setFontSize(12);
    doc.text(`No.Bukti : ${noJurnalUmum}`, 15, 40);
    doc.text(`Tanggal : ${tanggal}`, 15, 45);
    doc.text(`Total Debet : ${totalDebet.toLocaleString()}`, 15, 50);
    doc.text(`Total Kredit : ${totalKredit.toLocaleString()}`, 15, 55);
    doc.autoTable({
      margin: { top: 60 },
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: aJurnalUmumForDocDisplay
    });
    doc.save(`jurnalUmum-${noJurnalUmum}.pdf`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ pt: 10 }}>
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
        <ButtonModifier
          id={id}
          kode={"test"}
          addLink={`/daftarJurnalUmum/jurnalUmum/${id}/tambahAJurnalUmum`}
          editLink={`/daftarJurnalUmum/jurnalUmum/${id}/edit`}
          deleteUser={deleteUser}
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
          <Button startIcon={<DownloadIcon />} onClick={() => downloadPdf()}>
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
        <ShowTableJurnalUmum
          id={id}
          currentPosts={currentPosts}
          noJurnalUmum={noJurnalUmum}
        />
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
      <Box sx={{ pt: 4, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          color="primary"
          size={screenSize <= 600 ? "small" : "large"}
        />
      </Box>
    </Box>
  );
};

export default TampilJurnalUmum;
