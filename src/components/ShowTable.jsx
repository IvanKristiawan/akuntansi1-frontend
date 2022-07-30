import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Divider,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  CardActionArea
} from "@mui/material";
import { useStateContext } from "../contexts/ContextProvider";

export function ShowTableKelompokBukuBesar({ currentPosts, searchTerm }) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return screenSize >= 600 ? (
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
  ) : (
    <Box sx={{ width: "100%" }}>
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
          <Card
            elevation={3}
            sx={{ width: "100%", backgroundColor: "#f5f5f5", mb: 3 }}
          >
            <CardActionArea>
              <CardContent
                onClick={() => {
                  navigate(`/kelompokBukuBesar/${user._id}`);
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1
                  }}
                >
                  <Typography variant="body2" component="div">
                    {user.nama}
                  </Typography>
                  <Typography variant="body2" component="div">
                    {user.kode}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {user.jenis}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </Box>
  );
}

export function ShowTableBukuBesar({
  currentPosts,
  searchTerm,
  kelompokBukuBesar
}) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return screenSize >= 600 ? (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Kode</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              Nama Account Buku Besar (GL)
            </TableCell>
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
                <TableCell>
                  {user.kelompok} -{" "}
                  {kelompokBukuBesar
                    .filter((val) => val.kode === user.kelompok)
                    .map((sup) => ` ${sup.nama}`)}
                </TableCell>
                <TableCell>{user.jenisSaldo}</TableCell>
                <TableCell>{user.jenis}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Box sx={{ width: "100%" }}>
      {currentPosts
        .filter((val) => {
          if (searchTerm === "") {
            return val;
          } else if (
            val.kode.toUpperCase().includes(searchTerm.toUpperCase()) ||
            val.nama.toUpperCase().includes(searchTerm.toUpperCase()) ||
            val.kelompok.toUpperCase().includes(searchTerm.toUpperCase()) ||
            val.jenisSaldo.toUpperCase().includes(searchTerm.toUpperCase()) ||
            val.jenis.toUpperCase().includes(searchTerm.toUpperCase())
          ) {
            return val;
          }
        })
        .map((user, index) => (
          <Card
            elevation={3}
            sx={{ width: "100%", backgroundColor: "#f5f5f5", mb: 3 }}
          >
            <CardActionArea>
              <CardContent
                onClick={() => {
                  navigate(`/bukuBesar/${user._id}`);
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1
                  }}
                >
                  <Typography variant="body2" component="div">
                    {user.nama}
                  </Typography>
                  <Typography variant="body2" component="div">
                    {user.kode}
                  </Typography>
                </Box>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  {user.kelompok} -{" "}
                  {kelompokBukuBesar
                    .filter((val) => val.kode === user.kelompok)
                    .map((sup) => ` ${sup.nama}`)}
                </Typography>
                <Typography variant="body2">
                  {user.jenisSaldo} - {user.jenis}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </Box>
  );
}

export function ShowTableDaftarJurnalUmum({ currentPosts, searchTerm }) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return screenSize >= 600 ? (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>No. Bukti</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Tanggal</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Debet</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Kredit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.noJurnalUmum.includes(searchTerm) ||
                val.tanggal.toUpperCase().includes(searchTerm.toUpperCase())
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
                <TableCell>{user.totalDebet.toLocaleString()}</TableCell>
                <TableCell>{user.totalKredit.toLocaleString()}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Box sx={{ width: "100%" }}>
      {currentPosts
        .filter((val) => {
          if (searchTerm === "") {
            return val;
          } else if (
            val.noJurnalUmum.includes(searchTerm) ||
            val.tanggal.toUpperCase().includes(searchTerm.toUpperCase())
          ) {
            return val;
          }
        })
        .map((user, index, row) => (
          <Card
            elevation={3}
            sx={{ width: "100%", backgroundColor: "#f5f5f5", mb: 3 }}
          >
            <CardActionArea>
              <CardContent
                onClick={() => {
                  navigate(
                    `/daftarJurnalUmum/jurnalUmum/${user._id}/${user.noJurnalUmum}`
                  );
                }}
              >
                <Typography gutterBottom variant="subtitle1" component="div">
                  No. Bukti : {user.noJurnalUmum}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.tanggal}
                </Typography>
                <Paper elevation={3} sx={{ p: 1 }}>
                  <Typography variant="body2">
                    Debet : {user.totalDebet.toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    Kredit : {user.totalKredit.toLocaleString()}
                  </Typography>
                </Paper>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </Box>
  );
}

export function ShowTableJurnalUmum({ id, currentPosts }) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return screenSize >= 600 ? (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Tanggal</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              Kode - Nama Account
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Keterangan</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Debet</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Kredit</TableCell>
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
              <TableCell>{aJurnalUmum.keterangan}</TableCell>
              <TableCell>{aJurnalUmum.debet.toLocaleString()}</TableCell>
              <TableCell>{aJurnalUmum.kredit.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Box sx={{ width: "100%" }}>
      {currentPosts.map((aJurnalUmum, index, row) => (
        <Card
          elevation={3}
          sx={{ width: "100%", backgroundColor: "#f5f5f5", mb: 3 }}
        >
          <CardActionArea>
            <CardContent
              onClick={() => {
                navigate(
                  `/daftarJurnalUmum/jurnalUmum/${id}/${aJurnalUmum.noJurnalUmum}/${aJurnalUmum._id}`
                );
              }}
            >
              <Typography gutterBottom variant="subtitle1" component="div">
                {aJurnalUmum.kodeAccount} - {aJurnalUmum.namaAccount}
              </Typography>
              <Typography variant="body2">{aJurnalUmum.tanggal}</Typography>
              <Typography variant="body2" color="text.secondary">
                {aJurnalUmum.keterangan}
              </Typography>
              <Paper elevation={3} sx={{ p: 1 }}>
                <Typography variant="body2">
                  Debet : {aJurnalUmum.debet.toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  Kredit : {aJurnalUmum.kredit.toLocaleString()}
                </Typography>
              </Paper>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export function ShowLaporanBukuBesar({
  currentPosts,
  kodeBukuBesar,
  jenisSaldo
}) {
  const { screenSize } = useStateContext();
  let tempSaldo = 0;
  return screenSize >= 600 ? (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <colgroup>
          <col style={{ width: "10%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Tanggal</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Keterangan</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Debet</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Kredit</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Saldo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (kodeBukuBesar === val.kodeBukuBesar) {
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
              >
                <TableCell component="th" scope="row">
                  {user.tanggal}
                </TableCell>
                <TableCell>{user.keterangan}</TableCell>
                {screenSize >= 600 && (
                  <>
                    <TableCell>{user.debet.toLocaleString()}</TableCell>
                    <TableCell>{user.kredit.toLocaleString()}</TableCell>
                    <TableCell>
                      {jenisSaldo === "DEBET"
                        ? (tempSaldo +=
                            user.debet - user.kredit).toLocaleString()
                        : (tempSaldo +=
                            user.kredit - user.debet).toLocaleString()}
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Card elevation={3} sx={{ width: "100%", backgroundColor: "#f5f5f5" }}>
      <CardActionArea>
        {currentPosts
          .filter((val) => {
            if (kodeBukuBesar === val.kodeBukuBesar) {
              return val;
            }
          })
          .map((user, index, row) => (
            <>
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {user.tanggal}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.keterangan}
                </Typography>
                <Paper elevation={3} sx={{ p: 1 }}>
                  <Typography variant="body2">
                    Debet : {user.debet.toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    Kredit : {user.kredit.toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    Saldo :{" "}
                    {jenisSaldo === "DEBET"
                      ? (tempSaldo += user.debet - user.kredit).toLocaleString()
                      : (tempSaldo +=
                          user.kredit - user.debet).toLocaleString()}
                  </Typography>
                </Paper>
                {index + 1 !== row.length && <Divider sx={{ pb: 3, mb: -2 }} />}
              </CardContent>
            </>
          ))}
      </CardActionArea>
    </Card>
  );
}

export function ShowNeracaSaldo({ currentPosts, kodeBukuBesar }) {
  const { screenSize } = useStateContext();
  return screenSize >= 600 ? (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <colgroup>
          <col style={{ width: "10%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Kode Account</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nama Account</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Debet</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Kredit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (kodeBukuBesar === val.kodeAccount) {
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
              >
                <TableCell component="th" scope="row">
                  {user.kodeAccount}
                </TableCell>
                <TableCell>{user.namaAccount}</TableCell>
                {screenSize >= 600 && (
                  <>
                    <TableCell>{user.debet.toLocaleString()}</TableCell>
                    <TableCell>{user.kredit.toLocaleString()}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Card elevation={3} sx={{ width: "100%", backgroundColor: "#f5f5f5" }}>
      <CardActionArea>
        {currentPosts
          .filter((val) => {
            if (kodeBukuBesar === val.kodeAccount) {
              return val;
            }
          })
          .map((user, index, row) => (
            <>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1
                  }}
                >
                  <Typography variant="body2" component="div">
                    {user.kodeAccount}
                  </Typography>
                  <Typography variant="body2" component="div">
                    {user.namaAccount}
                  </Typography>
                </Box>
                <Paper elevation={3} sx={{ p: 1 }}>
                  <Typography variant="body2">
                    Debet : {user.debet.toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    Kredit : {user.kredit.toLocaleString()}
                  </Typography>
                </Paper>
                {index + 1 !== row.length && <Divider sx={{ pb: 3, mb: -2 }} />}
              </CardContent>
            </>
          ))}
      </CardActionArea>
    </Card>
  );
}

export function ShowLabaRugi({ currentPosts, kelompokAccount }) {
  return currentPosts
    .filter((val) => {
      if (kelompokAccount === val.kelompokAccount) {
        return val;
      }
    })
    .map((user, index) => (
      <>
        <TableRow
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
            "&:hover": { bgcolor: "#eeeeee" },
            cursor: "pointer"
          }}
        >
          <TableCell component="th" scope="row">
            {user.kodeAccount}
          </TableCell>
          <TableCell>{user.namaAccount}</TableCell>
          <TableCell>Rp {user.total.toLocaleString()}</TableCell>
        </TableRow>
      </>
    ));
}
