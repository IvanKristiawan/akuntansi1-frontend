import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles.css";
import { Paper, Box } from "@mui/material";
import { Header, Footer } from "./components/index";
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
  TampilAJurnalUmum,
  LaporanBukuBesar,
  NeracaSaldo,
  LabaRugi,
  PerubahanModal,
  Neraca
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
      <Box sx={{ backgroundColor: "#e0e0e0" }}>
        <BrowserRouter>
          <Header />
          <Paper
            elevation={3}
            sx={{
              margin: screenSize >= 1000 ? 5 : 1,
              mb: 0,
              padding: 2,
              backgroundColor: "#fafafa"
            }}
          >
            <Routes>
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
                path="/daftarJurnalUmum/jurnalUmum/:id/:noJU"
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
                path="/daftarJurnalUmum/jurnalUmum/:id/:noJU/:idAJurnalUmum"
                element={<TampilAJurnalUmum />}
              />
              {/* Laporan Buku Besar */}
              <Route path="/bukuBesarGL" element={<LaporanBukuBesar />} />
              {/* Neraca Saldo */}
              <Route path="/neracaSaldo" element={<NeracaSaldo />} />
              {/* Laba Rugi */}
              <Route path="/labaRugi" element={<LabaRugi />} />
              {/* Perubahan Modal */}
              <Route path="/perubahanModal" element={<PerubahanModal />} />
              {/* Neraca */}
              <Route path="/neraca" element={<Neraca />} />
              {/* <Route path="/bukuBesar" element={<KelompokBukuBesar />} /> */}
            </Routes>
          </Paper>
          <Footer />
        </BrowserRouter>
      </Box>
    </div>
  );
}
