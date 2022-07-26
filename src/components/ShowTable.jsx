import * as React from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useStateContext } from "../contexts/ContextProvider";

export function ShowTableKelompokBukuBesar({ currentPosts, searchTerm }) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Kode</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              Nama Kelompok Buku Besar
            </TableCell>
            {screenSize >= 600 && (
              <>
                <TableCell
                  sx={{
                    fontWeight: "bold"
                  }}
                >
                  Jenis Account
                </TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.kode.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.nama.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.jenis.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/kelompokBukuBesar/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kode}
                </TableCell>
                <TableCell>{user.nama}</TableCell>
                {screenSize >= 600 && (
                  <>
                    <TableCell>{user.jenis}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableBukuBesar({
  currentPosts,
  searchTerm,
  kelompokBukuBesar
}) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Kode</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              Nama Account Buku Besar (GL)
            </TableCell>
            {screenSize >= 600 && (
              <>
                <TableCell
                  sx={{
                    fontWeight: "bold"
                  }}
                >
                  Kelompok
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold"
                  }}
                >
                  Jenis Saldo
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold"
                  }}
                >
                  Jenis
                </TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.kode.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.nama.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.kelompok.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.jenisSaldo
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.jenis.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/bukuBesar/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kode}
                </TableCell>
                <TableCell>{user.nama}</TableCell>
                {screenSize >= 600 && (
                  <>
                    <TableCell>
                      {user.kelompok} -{" "}
                      {kelompokBukuBesar
                        .filter((val) => val.kode === user.kelompok)
                        .map((sup) => ` ${sup.nama}`)}
                    </TableCell>
                    <TableCell>{user.jenisSaldo}</TableCell>
                    <TableCell>{user.jenis}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableDaftarJurnalUmum({ currentPosts, searchTerm }) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>No. Bukti</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Tanggal</TableCell>
            {screenSize >= 600 && (
              <>
                <TableCell sx={{ fontWeight: "bold" }}>Debet</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Kredit</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.noJurnalUmum.includes(searchTerm) ||
                val.totalDebet
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.totalKredit.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(
                    `/daftarJurnalUmum/jurnalUmum/${user._id}/${user.noJurnalUmum}`
                  );
                }}
              >
                <TableCell component="th" scope="row">
                  {user.noJurnalUmum}
                </TableCell>
                <TableCell>{user.tanggal}</TableCell>
                {screenSize >= 600 && (
                  <TableCell>{user.totalDebet.toLocaleString()}</TableCell>
                )}
                <TableCell>{user.totalKredit.toLocaleString()}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableJurnalUmum({ id, currentPosts }) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Tanggal</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              Kode - Nama Account
            </TableCell>
            {screenSize >= 600 && (
              <>
                <TableCell sx={{ fontWeight: "bold" }}>Keterangan</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Debet</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Kredit</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts.map((aJurnalUmum, index) => (
            <TableRow
              key={aJurnalUmum.noJurnalUmum}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { bgcolor: "#eeeeee" },
                cursor: "pointer"
              }}
              onClick={() => {
                navigate(
                  `/daftarJurnalUmum/jurnalUmum/${id}/${aJurnalUmum.noJurnalUmum}/${aJurnalUmum._id}`
                );
              }}
            >
              <TableCell component="th" scope="row">
                {aJurnalUmum.tanggal}
              </TableCell>
              <TableCell>
                {aJurnalUmum.kodeAccount} - {aJurnalUmum.namaAccount}
              </TableCell>
              {screenSize >= 600 && (
                <>
                  <TableCell>{aJurnalUmum.keterangan}</TableCell>
                  <TableCell>{aJurnalUmum.debet.toLocaleString()}</TableCell>
                  <TableCell>{aJurnalUmum.kredit.toLocaleString()}</TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
