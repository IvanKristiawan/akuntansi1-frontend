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
import { ShowPerubahanModal, ShowNeraca } from "../../components/ShowTable";
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
    const getHartaLancar = await axios.get(`${tempUrl}/hartaLancarAll`);
    setHartaLancar(getHartaLancar.data);
    // Get Harta Tetap
    const getHartaTetap = await axios.get(`${tempUrl}/hartaTetapAll`);
    setHartaTetap(getHartaTetap.data);
    // Get Kewajiban
    const getKewajiban = await axios.get(`${tempUrl}/kewajibanLast`);
    setTotalKewajiban(getKewajiban.data[0].totalKewajiban);
    // Get Kewajiban All
    const getKewajibanAll = await axios.get(`${tempUrl}/kewajibanAll`);
    setKewajiban(getKewajibanAll.data);
    // Get Modal
    const getModal = await axios.get(`${tempUrl}/perubahanModalLast`);
    setModal(getModal.data[0]);
    setTotalModal(getModal.data[0].total);
    setTotalKewajibanModal(
      getKewajiban.data[0].totalKewajiban + getModal.data[0].total
    );
    // Post Total
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ pt: 5 }}>
      <Typography color="#757575">Laporan</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Neraca
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
