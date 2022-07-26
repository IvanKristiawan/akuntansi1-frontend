import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, TextField, Typography, Divider, Pagination } from "@mui/material";
import { ShowTableJurnalUmum } from "../../components/ShowTable";
import { Loader, usePagination, ButtonModifier } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import { useStateContext } from "../../contexts/ContextProvider";

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
  const navigate = useNavigate();

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
    id && getUserById();
  }, [id]);

  const getAJurnalUmums = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/aJurnalUmums`);
    setAJurnalUmums(response.data);
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
