import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, TextField, Typography, Divider, Button } from "@mui/material";
import { Loader } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import { useStateContext } from "../../contexts/ContextProvider";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const TampilAJurnalUmum = () => {
  const { id, idAJurnalUmum } = useParams();
  const navigate = useNavigate();
  const { screenSize } = useStateContext();
  const [idNeracaSaldo, setIdNeracaSaldo] = useState("");
  const [idLaporanBukuBesar, setIdLaporanBukuBesar] = useState("");
  const [noJurnalUmum, setNoJurnalUmum] = useState("");
  const [kodeAccount, setKodeAccount] = useState("");
  const [namaAccount, setNamaAccount] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [debet, setDebet] = useState(0);
  const [kredit, setKredit] = useState(0);
  const [jurnalUmum, setJurnalUmum] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getJurnalUmum();
    getUserById();
  }, []);

  const getUserById = async () => {
    if (id) {
      setLoading(true);
      const response = await axios.get(
        `${tempUrl}/aJurnalUmum/${idAJurnalUmum}`
      );
      setIdNeracaSaldo(response.data.idNeracaSaldo);
      setIdLaporanBukuBesar(response.data.idLaporanBukuBesar);
      setNoJurnalUmum(response.data.noJurnalUmum);
      setTanggal(response.data.tanggal);
      setNamaAccount(response.data.namaAccount);
      setKodeAccount(response.data.kodeAccount);
      setKeterangan(response.data.keterangan);
      setDebet(response.data.debet);
      setKredit(response.data.kredit);
      setLoading(false);
    }
  };

  const getJurnalUmum = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/jurnalUmums/${id}`);
    setJurnalUmum(response.data);
    setLoading(false);
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      let tempJenisAccount;
      let tempIdNeracaSaldo;
      let tempLabaRugiTransaksi;
      let tempLabaRugiTransaksiOther;
      const newDebet = parseInt(jurnalUmum.totalDebet) - parseInt(debet);
      const newKredit = parseInt(jurnalUmum.totalKredit) - parseInt(kredit);
      let kelompokAccount = kodeAccount.slice(0, 3);

      // Patch Jurnal Umum
      await axios.patch(`${tempUrl}/jurnalUmums/${jurnalUmum._id}`, {
        totalDebet: newDebet,
        totalKredit: newKredit,
        balance: jurnalUmum.balance - (debet - kredit)
      });

      // Get Neraca Saldo
      let tempNeracaSaldo = await axios.get(
        `${tempUrl}/neracaSaldos/${idNeracaSaldo}`
      );

      // Get Perubahan Modal
      let tempPerubahanModal = await axios.get(`${tempUrl}/perubahanModalLast`);

      // Get Harta
      let tempHarta = await axios.get(`${tempUrl}/hartaLast`);
      // Get Harta Lancar
      let tempHartaLancarAll = await axios.get(`${tempUrl}/hartaLancarAll`);
      let tempHartaLancar = await axios.get(
        `${tempUrl}/hartaLancar/${kodeAccount}`
      );
      let tempHartaLancarOther = await axios.get(
        `${tempUrl}/hartaLancarOther/${kodeAccount}`
      );
      // Get Harta Tetap
      let tempHartaTetapAll = await axios.get(`${tempUrl}/hartaTetapAll`);
      let tempHartaTetap = await axios.get(
        `${tempUrl}/hartaTetap/${kodeAccount}`
      );
      let tempHartaTetapOther = await axios.get(
        `${tempUrl}/hartaTetapOther/${kodeAccount}`
      );

      // Get Kewajiban
      let tempKewajibanLast = await axios.get(`${tempUrl}/kewajibanLast`);
      let tempKewajiban = await axios.get(
        `${tempUrl}/kewajiban/${kodeAccount}`
      );
      let tempKewajibanOther = await axios.get(
        `${tempUrl}/kewajibanOther/${kodeAccount}`
      );

      // Patch Laba Rugi
      let tempLabaRugi = await axios.get(`${tempUrl}/labaRugiLast`);
      alert("There's Neraca Saldo");
      tempLabaRugiTransaksi = await axios.get(
        `${tempUrl}/labaRugiTransaksi/${tempNeracaSaldo.data.kodeAccount}`
      );
      tempLabaRugiTransaksiOther = await axios.get(
        `${tempUrl}/labaRugiTransaksiOther/${tempNeracaSaldo.data.kodeAccount}`
      );
      alert("HIt here");

      // Patch Harta dan Kewajiban
      // Harta
      if (
        parseInt(kelompokAccount) >= 101 &&
        parseInt(kelompokAccount) <= 110
      ) {
        // Harta Lancar
        alert("Harta Lancar");
        alert(tempHartaLancarOther);
        tempHartaLancarOther.data.push({
          kodeAccount,
          namaAccount,
          kelompokAccount,
          total:
            tempHartaLancar.data[0].total - (parseInt(debet) - parseInt(kredit))
        });
        alert("Harta Lancar Push");
        await axios.patch(`${tempUrl}/hartas/${tempHarta.data[0]._id}`, {
          hartaLancar: tempHartaLancarOther.data,
          hartaTetap: tempHartaTetapAll.data,
          totalHartaLancar:
            tempHarta.data[0].totalHartaLancar -
            (parseInt(debet) - parseInt(kredit)),
          totalHartaTetap: tempHarta.data[0].totalHartaTetap,
          totalHarta:
            tempHarta.data[0].totalHarta - (parseInt(debet) - parseInt(kredit))
        });
        alert("Harta lancar Patch");
      } else if (
        parseInt(kelompokAccount) >= 120 &&
        parseInt(kelompokAccount) <= 129
      ) {
        // Harta Tetap
        alert("Harta Tetap");
        tempHartaTetapOther.data.push({
          kodeAccount,
          namaAccount,
          kelompokAccount,
          total:
            tempHartaTetap.data[0].total - parseInt(debet) - parseInt(kredit)
        });
        await axios.patch(`${tempUrl}/hartas/${tempHarta.data[0]._id}`, {
          hartaTetap: tempHartaTetapOther.data,
          hartaLancar: tempHartaLancarAll.data,
          totalHartaLancar: tempHarta.data[0].totalHartaLancar,
          totalHartaTetap:
            tempHarta.data[0].totalHartaTetap -
            (parseInt(debet) - parseInt(kredit)),
          totalHarta:
            tempHarta.data[0].totalHarta - (parseInt(debet) - parseInt(kredit))
        });
      } else if (
        parseInt(kelompokAccount) >= 201 &&
        parseInt(kelompokAccount) <= 211
      ) {
        // Hutang / Kewajiban
        alert("Kewajiban");
        tempKewajibanOther.data.push({
          kodeAccount,
          namaAccount,
          kelompokAccount,
          total:
            tempKewajiban.data[0].total - parseInt(kredit) - parseInt(debet)
        });
        await axios.patch(
          `${tempUrl}/kewajibans/${tempKewajibanLast.data[0]._id}`,
          {
            kewajiban: tempKewajibanOther.data,
            totalKewajiban:
              tempKewajibanLast.data[0].totalKewajiban -
              (parseInt(kredit) - parseInt(debet))
          }
        );
      }

      if (tempNeracaSaldo.data) {
        if (tempNeracaSaldo.data.jenisAccount === "DEBET") {
          // Patch Neraca Saldo
          tempIdNeracaSaldo = await axios.patch(
            `${tempUrl}/neracaSaldos/${tempNeracaSaldo.data._id}`,
            {
              debet:
                tempNeracaSaldo.data.debet -
                (parseInt(debet) - parseInt(kredit))
            }
          );
          // Patch Laba Rugi
          if (kodeAccount.slice(0, 3) === "304") {
            // HPP
            alert("Hit hpp");
            tempLabaRugiTransaksiOther.data.push({
              idNeracaSaldo: tempIdNeracaSaldo.data._id,
              kodeAccount,
              namaAccount,
              kelompokAccount: kodeAccount.slice(0, 3),
              total:
                tempLabaRugiTransaksi.data[0].total -
                (parseInt(debet) - parseInt(kredit))
            });
            await axios.patch(
              `${tempUrl}/labaRugis/${tempLabaRugi.data[0]._id}`,
              {
                tanggal: tempLabaRugi.data[0].tanggal,
                transaksi: tempLabaRugiTransaksiOther.data,
                totalPendapatan: tempLabaRugi.data[0].totalPendapatan,
                totalHPP: tempLabaRugi.data[0].totalHPP - parseInt(debet),
                totalBebanOperasional:
                  tempLabaRugi.data[0].totalBebanOperasional,
                labaKotor: tempLabaRugi.data[0].labaKotor + parseInt(debet),
                labaBersih: tempLabaRugi.data[0].labaBersih + parseInt(debet)
              }
            );
            alert("Hit HPP Perubahan Modal");
            await axios.patch(
              `${tempUrl}/perubahanModals/${tempPerubahanModal.data[0]._id}`,
              {
                labaBersih: tempLabaRugi.data[0].labaBersih + parseInt(debet),
                total: tempPerubahanModal.data[0].total + parseInt(debet)
              }
            );
          } else if (kodeAccount.slice(0, 3) === "310") {
            // Biaya
            alert("Masuk Biaya");
            tempLabaRugiTransaksiOther.data.push({
              idNeracaSaldo: tempIdNeracaSaldo.data._id,
              kodeAccount,
              namaAccount,
              kelompokAccount: kodeAccount.slice(0, 3),
              total:
                tempLabaRugiTransaksi.data[0].total -
                (parseInt(debet) - parseInt(kredit))
            });
            await axios.patch(
              `${tempUrl}/labaRugis/${tempLabaRugi.data[0]._id}`,
              {
                tanggal: tempLabaRugi.data[0].tanggal,
                transaksi: tempLabaRugiTransaksiOther.data,
                totalPendapatan: tempLabaRugi.data[0].totalPendapatan,
                totalHPP: tempLabaRugi.data[0].totalHPP,
                totalBebanOperasional:
                  tempLabaRugi.data[0].totalBebanOperasional - parseInt(debet),
                labaKotor: tempLabaRugi.data[0].labaKotor,
                labaBersih: tempLabaRugi.data[0].labaBersih + parseInt(debet)
              }
            );
            alert("Hit Biaya Perubahan Modal");
            await axios.patch(
              `${tempUrl}/perubahanModals/${tempPerubahanModal.data[0]._id}`,
              {
                labaBersih: tempLabaRugi.data[0].labaBersih + parseInt(debet),
                total: tempPerubahanModal.data[0].total + parseInt(debet)
              }
            );
          }
        } else {
          // Kredit Pendapatan
          alert("Masuk Kredit Pendapatan");
          // Patch Neraca Saldo
          tempIdNeracaSaldo = await axios.patch(
            `${tempUrl}/neracaSaldos/${tempNeracaSaldo.data._id}`,
            {
              kredit:
                tempNeracaSaldo.data.kredit -
                (parseInt(kredit) - parseInt(debet))
            }
          );
          if (kodeAccount.slice(0, 3) === "220") {
            // Kredit Modal
            alert("Masuk Kredit Modal");
            await axios.patch(
              `${tempUrl}/perubahanModals/${tempPerubahanModal.data[0]._id}`,
              {
                modalSaham:
                  tempNeracaSaldo.data.kredit -
                  (parseInt(kredit) - parseInt(debet)),
                total:
                  tempNeracaSaldo.data.kredit -
                  (parseInt(kredit) - parseInt(debet))
              }
            );
          }
          // Patch Laba Rugi
          if (kodeAccount.slice(0, 3) === "301") {
            // Laba Rugi Pendapatan Kredit
            tempLabaRugiTransaksiOther.data.push({
              idNeracaSaldo: tempIdNeracaSaldo.data._id,
              kodeAccount,
              namaAccount,
              kelompokAccount: kodeAccount.slice(0, 3),
              total:
                tempLabaRugiTransaksi.data[0].total -
                (parseInt(kredit) - parseInt(debet))
            });
            await axios.patch(
              `${tempUrl}/labaRugis/${tempLabaRugi.data[0]._id}`,
              {
                tanggal: tempLabaRugi.data[0].tanggal,
                transaksi: tempLabaRugiTransaksiOther.data,
                totalPendapatan:
                  tempLabaRugi.data[0].totalPendapatan - parseInt(kredit),
                totalHPP: tempLabaRugi.data[0].totalHPP,
                totalBebanOperasional:
                  tempLabaRugi.data[0].totalBebanOperasional,
                labaKotor: tempLabaRugi.data[0].labaKotor - parseInt(kredit),
                labaBersih: tempLabaRugi.data[0].labaBersih - parseInt(kredit)
              }
            );
            alert("Hit Pendapatan Perubahan Modal");
            await axios.patch(
              `${tempUrl}/perubahanModals/${tempPerubahanModal.data[0]._id}`,
              {
                labaBersih: tempLabaRugi.data[0].labaBersih - parseInt(kredit),
                total: tempPerubahanModal.data[0].total - parseInt(kredit)
              }
            );
          }
        }
      }
      alert("Pass");

      // Delete A Jurnal Umum
      await axios.delete(`${tempUrl}/aJurnalUmums/${idAJurnalUmum}`);

      // Delete Laporan Buku Besar
      await axios.delete(`${tempUrl}/laporanBukuBesars/${idLaporanBukuBesar}`);

      setNoJurnalUmum("");
      setTanggal("");
      setNamaAccount("");
      setKodeAccount("");
      setKeterangan("");
      setDebet(0);
      setKredit(0);
      setLoading(false);
      navigate(`/daftarJurnalUmum/jurnalUmum/${id}/${noJurnalUmum}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ pt: 5 }}>
      <Typography color="#757575">Jurnal Umum</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Entry Jurnal Buku Besar
      </Typography>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteOutlineIcon />}
          sx={{ textTransform: "none" }}
          onClick={() => deleteUser(id)}
        >
          Hapus
        </Button>
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
          <Box sx={{ marginTop: 2 }}>
            <Typography sx={{ margin: 1, fontWeight: "500" }}>
              Kode Buku Besar
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
              value={`${kodeAccount} - ${namaAccount}`}
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
          <Box sx={{ marginTop: 2 }}>
            <Typography sx={{ margin: 1, fontWeight: "500" }}>
              Keterangan
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
              value={keterangan}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography sx={{ margin: 1, fontWeight: "500" }}>
              Debet Rp.
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
              value={debet.toLocaleString()}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography sx={{ margin: 1, fontWeight: "500" }}>
              Kredit Rp.
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
              value={kredit.toLocaleString()}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TampilAJurnalUmum;
