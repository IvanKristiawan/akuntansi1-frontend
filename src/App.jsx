import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles.css";
import { Paper, Box } from "@mui/material";
import { Header } from "./components/index";
import { useStateContext } from "./contexts/ContextProvider";
import {
  KelompokBukuBesar,
  TambahKelompokBukuBesar,
  UbahKelompokBukuBesar,
  BukuBesar,
  TambahBukuBesar,
  UbahBukuBesar,
  TampilDaftarJurnalUmum,
  TambahJurnalUmum,
  TampilJurnalUmum,
  UbahJurnalUmum,
  TambahAJurnalUmum,
  TampilAJurnalUmum
} from "./pages";

export default function App() {
  const { screenSize, setScreenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="App">
      <Box sx={{ backgroundColor: "#eeeeee" }}>
        <BrowserRouter>
          <Header />
          <Paper sx={{ margin: 1, padding: 2 }}>
            <Routes>
              {/* <Route path="/dashboard" element={<KelompokBukuBesar />} /> */}
              {/* <Route path="/tambahTransaksi" element={<KelompokBukuBesar />} /> */}
              {/* Master */}
              {/* Kelompok Buku Besar */}
              <Route
                path="/kelompokBukuBesar"
                element={<KelompokBukuBesar />}
              />
              <Route
                path="/kelompokBukuBesar/:id"
                element={<KelompokBukuBesar />}
              />
              <Route
                path="/kelompokBukuBesar/:id/edit"
                element={<UbahKelompokBukuBesar />}
              />
              <Route
                path="/kelompokBukuBesar/tambah"
                element={<TambahKelompokBukuBesar />}
              />
              {/* Buku Besar */}
              <Route path="/bukuBesar" element={<BukuBesar />} />
              <Route path="/bukuBesar/:id" element={<BukuBesar />} />
              <Route path="/bukuBesar/:id/edit" element={<UbahBukuBesar />} />
              <Route path="/bukuBesar/tambah" element={<TambahBukuBesar />} />
              {/* Jurnal Umum */}
              <Route
                path="/daftarJurnalUmum"
                element={<TampilDaftarJurnalUmum />}
              />
              <Route
                path="/daftarJurnalUmum/jurnalUmum/tambah"
                element={<TambahJurnalUmum />}
              />
              <Route
                path="/daftarJurnalUmum/jurnalUmum/:id"
                element={<TampilJurnalUmum />}
              />
              <Route
                path="/daftarJurnalUmum/jurnalUmum/:id/edit"
                element={<UbahJurnalUmum />}
              />
              {/* A Jurnal Umum */}
              <Route
                path="/daftarJurnalUmum/jurnalUmum/:id/tambahAJurnalUmum"
                element={<TambahAJurnalUmum />}
              />
              <Route
                path="/daftarJurnalUmum/jurnalUmum/:id/:idAJurnalUmum"
                element={<TampilAJurnalUmum />}
              />
              {/* <Route path="/bukuBesar" element={<KelompokBukuBesar />} /> */}
            </Routes>
          </Paper>
        </BrowserRouter>
      </Box>
    </div>
  );
}
