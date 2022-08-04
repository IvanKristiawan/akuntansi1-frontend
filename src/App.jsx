import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./styles.css";
import { AuthContext } from "./contexts/AuthContext";
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
  Neraca,
  Login,
  Register,
  Profil,
  UbahProfil,
  DaftarUser,
  UbahDaftarUser
} from "./pages";

export default function App() {
  const { screenSize, setScreenSize } = useStateContext();

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user && user.isAdmin) {
      return children;
    }

    return <Navigate to="/login" />;
  };

  const ProtectedRouteUser = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user) {
      return children;
    }

    return <Navigate to="/login" />;
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="App">
      <Box
        sx={{
          backgroundColor: "#e0e0e0",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <BrowserRouter>
          <Header />
          <Paper
            elevation={3}
            sx={{
              margin: screenSize >= 1000 ? 5 : 1,
              mb: 0,
              backgroundColor: "#fafafa"
            }}
          >
            <Routes>
              {/* Main */}
              <Route path="/" element={<TampilDaftarJurnalUmum />} />
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
                element={
                  <ProtectedRoute>
                    <UbahKelompokBukuBesar />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/kelompokBukuBesar/tambah"
                element={
                  <ProtectedRoute>
                    <TambahKelompokBukuBesar />
                  </ProtectedRoute>
                }
              />
              {/* Buku Besar */}
              <Route path="/bukuBesar" element={<BukuBesar />} />
              <Route path="/bukuBesar/:id" element={<BukuBesar />} />
              <Route
                path="/bukuBesar/:id/edit"
                element={
                  <ProtectedRoute>
                    <UbahBukuBesar />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bukuBesar/tambah"
                element={
                  <ProtectedRoute>
                    <TambahBukuBesar />
                  </ProtectedRoute>
                }
              />
              {/* Jurnal Umum */}
              <Route
                path="/daftarJurnalUmum"
                element={<TampilDaftarJurnalUmum />}
              />
              <Route
                path="/daftarJurnalUmum/jurnalUmum/tambah"
                element={
                  <ProtectedRoute>
                    <TambahJurnalUmum />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/daftarJurnalUmum/jurnalUmum/:id/:noJU"
                element={<TampilJurnalUmum />}
              />
              <Route
                path="/daftarJurnalUmum/jurnalUmum/:id/edit"
                element={
                  <ProtectedRoute>
                    <UbahJurnalUmum />
                  </ProtectedRoute>
                }
              />
              {/* A Jurnal Umum */}
              <Route
                path="/daftarJurnalUmum/jurnalUmum/:id/tambahAJurnalUmum"
                element={
                  <ProtectedRoute>
                    <TambahAJurnalUmum />
                  </ProtectedRoute>
                }
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
              {/* Profil */}
              <Route
                path="/profil"
                element={
                  <ProtectedRouteUser>
                    <Profil />
                  </ProtectedRouteUser>
                }
              />
              <Route
                path="/profil/:id/edit"
                element={
                  <ProtectedRouteUser>
                    <UbahProfil />
                  </ProtectedRouteUser>
                }
              />
              {/* Daftar User */}
              <Route
                path="/daftarUser"
                element={
                  <ProtectedRoute>
                    <DaftarUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/daftarUser/:id"
                element={
                  <ProtectedRoute>
                    <DaftarUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/daftarUser/:id/edit"
                element={
                  <ProtectedRoute>
                    <UbahDaftarUser />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Paper>
          <Routes>
            {/* Login */}
            <Route path="/login" element={<Login />} />
            {/* Register */}
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
        <Box sx={{ mt: "auto" }}>
          <Footer />
        </Box>
      </Box>
    </div>
  );
}
