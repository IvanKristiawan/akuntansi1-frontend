import React, { useState, useEffect } from "react";
import {
  Paper,
  Avatar,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon
} from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import "./font.css";

function Header() {
  const location = useLocation();
  const [menu, setMenu] = useState(false);
  const [profil, setProfil] = useState(false);
  const [transaksiMenu, setTransaksiMenu] = useState(false);
  const [masterMenu, setMasterMenu] = useState(false);
  const [laporanMenu, setLaporanMenu] = useState(false);
  const [pengaturanMenu, setPengaturanMenu] = useState(false);
  const { screenSize } = useStateContext();

  useEffect(() => {
    closeAllMenu();
  }, [location]);

  const closeAllMenu = () => {
    setProfil(false);
    setTransaksiMenu(false);
    setMasterMenu(false);
    setLaporanMenu(false);
    setPengaturanMenu(false);
  };

  const openMenu = () => {
    setMenu(!menu);
  };

  const openProfile = () => {
    setProfil(!profil);
    setTransaksiMenu(false);
    setMasterMenu(false);
    setLaporanMenu(false);
    setPengaturanMenu(false);
  };

  const openTransaksi = () => {
    setProfil(false);
    setTransaksiMenu(!transaksiMenu);
    setMasterMenu(false);
    setLaporanMenu(false);
    setPengaturanMenu(false);
  };

  const openMaster = () => {
    setProfil(false);
    setTransaksiMenu(false);
    setMasterMenu(!masterMenu);
    setLaporanMenu(false);
    setPengaturanMenu(false);
  };

  const openLaporan = () => {
    setProfil(false);
    setTransaksiMenu(false);
    setMasterMenu(false);
    setLaporanMenu(!laporanMenu);
    setPengaturanMenu(false);
  };

  const openPengaturan = () => {
    setProfil(false);
    setTransaksiMenu(false);
    setMasterMenu(false);
    setLaporanMenu(false);
    setPengaturanMenu(!pengaturanMenu);
  };

  const MenuStyle = {
    position: "relative",
    padding: 1,
    marginLeft: 3,
    marginRight: screenSize <= 650 && 3,
    color: "#9e9e9e",
    transition: "0.2s",
    "&:hover": {
      boxShadow: "inset 0 -2px 0 0 #757575",
      color: "#757575",
      cursor: "pointer"
    }
  };

  return (
    <Box>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 1,
          paddingLeft: screenSize >= 650 ? 8 : 2,
          paddingRight: screenSize >= 650 ? 8 : 2
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Typography
            sx={{
              marginLeft: 1,
              color: "#757575",
              fontFamily: "Square Peg",
              fontSize: "35px"
            }}
          >
            Akun
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontFamily: "Square Peg", fontWeight: "bold" }}
          >
            Ti
          </Typography>
        </Box>
        {screenSize >= 650 ? (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 1,
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f5f5f5" }
              }}
              onClick={openProfile}
            >
              <Avatar
                alt="Company Profile"
                src="https://res.cloudinary.com/dbtag5lau/image/upload/v1650168835/jj5aoh7yg4w1yerrg1qn.jpg"
                sx={{ width: 30, height: 30 }}
              />
              <Typography sx={{ color: "#757575", ml: 1 }}>
                Ivan Kristiawan
              </Typography>
              <ArrowDropDownIcon />
            </Box>
            {profil && (
              <Paper
                sx={{
                  zIndex: 1,
                  display: "block",
                  position: "absolute",
                  top: "3rem",
                  right: "4rem"
                }}
              >
                <List>
                  <Link
                    to="/profil"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <PersonOutlineIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Profil"
                          sx={{ color: "#757575" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Divider sx={{ backgroundColor: "#fafafa" }} />
                  <Link
                    to="/logout"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Log out"
                          sx={{ color: "#757575" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                </List>
              </Paper>
            )}{" "}
          </>
        ) : (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={openMenu}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Paper>
      <Divider sx={{ backgroundColor: "#e0e0e0" }} />
      {(menu || screenSize >= 650) && (
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            justifyContent: screenSize >= 650 ? "flex-start" : "center",
            flexDirection: screenSize <= 650 && "column",
            padding: 1,
            paddingLeft: screenSize >= 650 && 4
          }}
        >
          <Box sx={MenuStyle}>
            <Link
              to="/daftarJurnalUmum"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography>Jurnal Umum</Typography>
            </Link>
          </Box>
          <Box sx={MenuStyle} onClick={openMaster}>
            <Typography sx={{ color: masterMenu && "black" }}>
              Master Data
            </Typography>
          </Box>
          {masterMenu && (
            <Paper
              sx={{
                zIndex: 1,
                display: "block",
                position: "absolute",
                top: screenSize >= 650 ? "7rem" : "9rem",
                left: screenSize >= 650 ? "10rem" : "2rem"
              }}
            >
              <List>
                <Link
                  to="/kelompokBukuBesar"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary="Kelompok Buku Besar"
                        sx={{ color: "#757575" }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Divider />
                <Link
                  to="/bukuBesar"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary="Buku Besar"
                        sx={{ color: "#757575" }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
            </Paper>
          )}
          <Box sx={MenuStyle} onClick={openLaporan}>
            <Typography sx={{ color: laporanMenu && "black" }}>
              Laporan
            </Typography>
          </Box>
          {laporanMenu && (
            <Paper
              sx={{
                zIndex: 1,
                display: "block",
                position: "absolute",
                top: screenSize >= 650 ? "7rem" : "12rem",
                left: screenSize >= 650 ? "18rem" : "2rem"
              }}
            >
              <List>
                <Link
                  to="/bukuBesarGL"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary="Buku Besar (GL)"
                        sx={{ color: "#757575" }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Divider />
                <Link
                  to="/neracaSaldo"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary="Neraca Saldo"
                        sx={{ color: "#757575" }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Divider />
                <Link
                  to="/labaRugi"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary="Laba Rugi"
                        sx={{ color: "#757575" }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Divider />
                <Link
                  to="/perubahanModal"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary="Perubahan Modal"
                        sx={{ color: "#757575" }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Divider />
                <Link
                  to="/neraca"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary="Neraca"
                        sx={{ color: "#757575" }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
            </Paper>
          )}
          <Box sx={MenuStyle} onClick={openPengaturan}>
            <Typography sx={{ color: pengaturanMenu && "black" }}>
              Pengaturan
            </Typography>
          </Box>
          {pengaturanMenu && (
            <Paper
              sx={{
                zIndex: 1,
                display: "block",
                position: "absolute",
                top: screenSize >= 650 ? "7rem" : "14rem",
                left: screenSize >= 650 ? "26rem" : "2rem"
              }}
            >
              <List>
                <Link
                  to="/profil"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary="Profil"
                        sx={{ color: "#757575" }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Divider />
                <Link
                  to="/logout"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary="Log out"
                        sx={{ color: "#757575" }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
            </Paper>
          )}
        </Paper>
      )}
    </Box>
  );
}

export default Header;
