import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, TextField, Typography, Divider, Pagination } from "@mui/material";
import { ShowTableKelompokBukuBesar } from "../../components/ShowTable";
import {
  SearchBar,
  Loader,
  usePagination,
  ButtonModifier
} from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import { useStateContext } from "../../contexts/ContextProvider";

const KelompokBukuBesar = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { screenSize } = useStateContext();
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 15;

  // Get current posts
  const indexOfLastPost = page * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;
  const tempPosts = users.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (
      val.kode.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.nama.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.jenis.toUpperCase().includes(searchTerm.toUpperCase())
    ) {
      return val;
    }
  });
  const currentPosts = tempPosts.slice(indexOfFirstPost, indexOfLastPost);

  const count = Math.ceil(tempPosts.length / PER_PAGE);
  const _DATA = usePagination(users, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    getUsers();
    {
      id && getUserById();
    }
  }, [id]);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/kelompokBukuBesars`);
    setUser(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.get(`${tempUrl}/kelompokBukuBesars/${id}`);
      setKode(response.data.kode);
      setNama(response.data.nama);
      setJenis(response.data.jenis);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${tempUrl}/kelompokBukuBesars/${id}`);
      getUsers();
      setKode("");
      setNama("");
      setJenis("");
      setLoading(false);
      navigate("/kelompokBukuBesar");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ p: 2, pt: 5 }}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Kelompok Buku Besar
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
          kode={kode}
          addLink={`/kelompokBukuBesar/tambah`}
          editLink={`/kelompokBukuBesar/${id}/edit`}
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
            mr: {
              xs: 0,
              sm: 10
            }
          }}
        >
          <Box>
            <Typography sx={{ margin: 1, fontWeight: "500" }}>Kode</Typography>
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
              value={kode}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography sx={{ margin: 1, fontWeight: "500" }}>
              Nama Kelompok
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
              value={nama}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography sx={{ margin: 1, fontWeight: "500" }}>
              Jenis Account
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
              value={jenis}
            />
          </Box>
        </Box>
      </Box>
      <Divider sx={{ pt: 4 }} />
      <Box sx={{ pt: 6, display: "flex", justifyContent: "center" }}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={{ pt: 4, display: "flex", justifyContent: "center" }}>
        <ShowTableKelompokBukuBesar
          currentPosts={currentPosts}
          searchTerm={searchTerm}
        />
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

export default KelompokBukuBesar;
