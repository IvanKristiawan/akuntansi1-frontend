import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Divider, Pagination } from "@mui/material";
import { ShowTableDaftarJurnalUmum } from "../../components/ShowTable";
import {
  SearchBar,
  Loader,
  usePagination,
  ButtonModifier
} from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import { useStateContext } from "../../contexts/ContextProvider";

const TampilDaftarJurnalUmum = () => {
  const { screenSize } = useStateContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState([]);
  const kode = null;

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  // Get current posts
  const indexOfLastPost = page * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;
  const tempPosts = users.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (
      val.nomorNota.includes(searchTerm) ||
      val.jenis.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.updatedAt.toUpperCase().includes(searchTerm.toUpperCase())
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
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/jurnalUmums`);
    setUser(response.data);
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ pt: 10 }}>
      <Typography color="#757575">Laporan</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Daftar Jurnal Umum
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
          id={"/"}
          kode={kode}
          addLink={`/daftarJurnalUmum/jurnalUmum/tambah`}
          editLink={`/`}
          deleteUser={"/"}
        />
      </Box>
      <Divider sx={{ pt: 4 }} />
      <Box sx={{ pt: 6, display: "flex", justifyContent: "center" }}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={{ pt: 4, display: "flex", justifyContent: "center" }}>
        <ShowTableDaftarJurnalUmum
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

export default TampilDaftarJurnalUmum;
