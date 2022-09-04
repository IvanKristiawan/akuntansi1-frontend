import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { tempUrl } from "../../contexts/ContextProvider";
import { Loader } from "../../components";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Autocomplete
} from "@mui/material";
import { useStateContext } from "../../contexts/ContextProvider";
import { useForm } from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";

const TambahAJurnalUmum = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { screenSize } = useStateContext();
  const { id } = useParams();
  const [account, setAccount] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [debet, setDebet] = useState(0);
  const [kredit, setKredit] = useState(0);
  const navigate = useNavigate();
  const [bukuBesars, setBukuBesars] = useState([]);
  const [jurnalUmums, setJurnalUmums] = useState([]);
  const [loading, setLoading] = useState(false);

  const bukuBesarOptions = bukuBesars.map((bukuBesar) => ({
    label: `${bukuBesar.kode} - ${bukuBesar.nama}`
  }));

  useEffect(() => {
    getBukuBesars();
    getJurnalUmums();
  }, []);

  const getBukuBesars = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/bukuBesarKodeNamaKelompok`);
    setBukuBesars(response.data);
    setLoading(false);
  };

  const getJurnalUmums = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/jurnalUmums/${id}`);
    setJurnalUmums(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    try {
      setLoading(true);
      let tempJenisAccount;
      let tempIdNeracaSaldo;
      let tempLabaRugiTransaksi;
      let tempLabaRugiTransaksiOther;
      let kodeAccount = account.split(" ", 1)[0];
      let namaAccount = account.split("-")[1];
      let kelompokAccount = kodeAccount.slice(0, 3);
      let tempTotalHarta;
      let tempLabaRugiTransaksiTotal;

      // Error Handling Debet & Kredit
      if (isNaN(parseInt(debet))) {
        setDebet(0);
      }
      if (isNaN(parseInt(kredit))) {
        setKredit(0);
      }

      // Get Neraca Saldo Last
      let tempNeracaSaldo = await axios.get(
        `${tempUrl}/neracaSaldoLast/${kodeAccount}`
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
      if (tempNeracaSaldo.data[0]) {
        // alert("There's Neraca Saldo");
        tempLabaRugiTransaksi = await axios.get(
          `${tempUrl}/labaRugiTransaksi/${tempNeracaSaldo.data[0].kodeAccount}`
        );
        tempLabaRugiTransaksiOther = await axios.get(
          `${tempUrl}/labaRugiTransaksiOther/${tempNeracaSaldo.data[0].kodeAccount}`
        );
      } else {
        // alert("There isn't Neraca Saldo");
        tempLabaRugiTransaksi = await axios.get(
          `${tempUrl}/labaRugiTransaksiAll`
        );
        tempLabaRugiTransaksiOther = await axios.get(
          `${tempUrl}/labaRugiTransaksiAll`
        );
      }

      // alert("HIt here");

      // Patch Harta dan Kewajiban
      // Harta
      if (
        parseInt(kelompokAccount) >= 101 &&
        parseInt(kelompokAccount) <= 110
      ) {
        // Harta Lancar
        // alert("Harta Lancar");
        // alert(tempHartaLancarOther);
        if (tempHartaLancar.data[0]) {
          // alert("There's harta lancar");
          tempTotalHarta =
            tempHartaLancar.data[0].total +
            (parseInt(debet) - parseInt(kredit));
        } else {
          // alert("There isn't harta lancar");
          tempTotalHarta = parseInt(debet) - parseInt(kredit);
        }
        tempHartaLancarOther.data.push({
          kodeAccount,
          namaAccount,
          kelompokAccount,
          total: tempTotalHarta
        });
        // alert("Harta Lancar Push");
        await axios.patch(`${tempUrl}/hartas/${tempHarta.data[0]._id}`, {
          hartaLancar: tempHartaLancarOther.data,
          hartaTetap: tempHartaTetapAll.data,
          totalHartaLancar:
            tempHarta.data[0].totalHartaLancar +
            (parseInt(debet) - parseInt(kredit)),
          totalHartaTetap: tempHarta.data[0].totalHartaTetap,
          totalHarta:
            tempHarta.data[0].totalHarta + (parseInt(debet) - parseInt(kredit))
        });
        // alert("Harta lancar Patch");
      } else if (
        parseInt(kelompokAccount) >= 120 &&
        parseInt(kelompokAccount) <= 129
      ) {
        // Harta Tetap
        // alert("Harta Tetap");
        if (tempHartaLancar.data[0]) {
          tempTotalHarta =
            tempHartaTetap.data[0].total + parseInt(debet) - parseInt(kredit);
        } else {
          tempTotalHarta = parseInt(debet) - parseInt(kredit);
        }
        tempHartaTetapOther.data.push({
          kodeAccount,
          namaAccount,
          kelompokAccount,
          total: tempTotalHarta
        });
        await axios.patch(`${tempUrl}/hartas/${tempHarta.data[0]._id}`, {
          hartaTetap: tempHartaTetapOther.data,
          hartaLancar: tempHartaLancarAll.data,
          totalHartaLancar: tempHarta.data[0].totalHartaLancar,
          totalHartaTetap:
            tempHarta.data[0].totalHartaTetap +
            (parseInt(debet) - parseInt(kredit)),
          totalHarta:
            tempHarta.data[0].totalHarta + (parseInt(debet) - parseInt(kredit))
        });
      } else if (
        parseInt(kelompokAccount) >= 201 &&
        parseInt(kelompokAccount) <= 211
      ) {
        // Hutang / Kewajiban
        // alert("Kewajiban");
        if (tempHartaLancar.data[0]) {
          tempTotalHarta =
            tempKewajiban.data[0].total + parseInt(kredit) - parseInt(debet);
        } else {
          tempTotalHarta = parseInt(kredit) - parseInt(debet);
        }
        tempKewajibanOther.data.push({
          kodeAccount,
          namaAccount,
          kelompokAccount,
          total: tempTotalHarta
        });
        await axios.patch(
          `${tempUrl}/kewajibans/${tempKewajibanLast.data[0]._id}`,
          {
            kewajiban: tempKewajibanOther.data,
            totalKewajiban:
              tempKewajibanLast.data[0].totalKewajiban +
              (parseInt(kredit) - parseInt(debet))
          }
        );
      }

      if (tempNeracaSaldo.data[0]) {
        if (tempNeracaSaldo.data[0].jenisAccount === "DEBET") {
          // Patch Neraca Saldo
          tempIdNeracaSaldo = await axios.patch(
            `${tempUrl}/neracaSaldos/${tempNeracaSaldo.data[0]._id}`,
            {
              debet:
                tempNeracaSaldo.data[0].debet +
                (parseInt(debet) - parseInt(kredit))
            }
          );
          // Patch Laba Rugi
          if (
            parseInt(kelompokAccount) >= 302 &&
            parseInt(kelompokAccount) <= 304
          ) {
            // HPP
            // alert("Hit hpp");
            tempLabaRugiTransaksiOther.data.push({
              idNeracaSaldo: tempIdNeracaSaldo.data._id,
              kodeAccount,
              namaAccount,
              kelompokAccount: kodeAccount.slice(0, 3),
              total:
                tempLabaRugiTransaksi.data[0].total +
                (parseInt(debet) - parseInt(kredit))
            });
            await axios.patch(
              `${tempUrl}/labaRugis/${tempLabaRugi.data[0]._id}`,
              {
                tanggal: tempLabaRugi.data[0].tanggal,
                transaksi: tempLabaRugiTransaksiOther.data,
                totalPendapatan: tempLabaRugi.data[0].totalPendapatan,
                totalHPP: tempLabaRugi.data[0].totalHPP + parseInt(debet),
                totalBebanOperasional:
                  tempLabaRugi.data[0].totalBebanOperasional,
                labaKotor: tempLabaRugi.data[0].labaKotor - parseInt(debet),
                labaBersih: tempLabaRugi.data[0].labaBersih - parseInt(debet)
              }
            );
            // alert("Hit HPP Perubahan Modal");
            await axios.patch(
              `${tempUrl}/perubahanModals/${tempPerubahanModal.data[0]._id}`,
              {
                labaBersih: tempLabaRugi.data[0].labaBersih - parseInt(debet),
                total: tempPerubahanModal.data[0].total - parseInt(debet)
              }
            );
          } else if (
            parseInt(kelompokAccount) >= 310 &&
            parseInt(kelompokAccount) <= 320
          ) {
            // Biaya
            // alert("Masuk Biaya");
            if (!tempLabaRugiTransaksi.data.total) {
              tempLabaRugiTransaksiTotal = 0;
            } else {
              tempLabaRugiTransaksiTotal = tempLabaRugiTransaksi.data[0].total;
            }
            tempLabaRugiTransaksiOther.data.push({
              idNeracaSaldo: tempIdNeracaSaldo.data._id,
              kodeAccount,
              namaAccount,
              kelompokAccount: kodeAccount.slice(0, 3),
              total:
                tempLabaRugiTransaksiTotal +
                (parseInt(debet) - parseInt(kredit))
            });
            // alert(tempLabaRugiTransaksiOther);
            // alert(tempLabaRugiTransaksiOther.data);
            // alert(tempLabaRugiTransaksiOther.data[0]);
            await axios.patch(
              `${tempUrl}/labaRugis/${tempLabaRugi.data[0]._id}`,
              {
                tanggal: tempLabaRugi.data[0].tanggal,
                transaksi: tempLabaRugiTransaksiOther.data,
                totalPendapatan: tempLabaRugi.data[0].totalPendapatan,
                totalHPP: tempLabaRugi.data[0].totalHPP,
                totalBebanOperasional:
                  tempLabaRugi.data[0].totalBebanOperasional + parseInt(debet),
                labaKotor: tempLabaRugi.data[0].labaKotor,
                labaBersih: tempLabaRugi.data[0].labaBersih - parseInt(debet)
              }
            );
            // alert("Hit Biaya Perubahan Modal");
            await axios.patch(
              `${tempUrl}/perubahanModals/${tempPerubahanModal.data[0]._id}`,
              {
                labaBersih: tempLabaRugi.data[0].labaBersih - parseInt(debet),
                total: tempPerubahanModal.data[0].total - parseInt(debet)
              }
            );
          }
        } else {
          // Kredit Pendapatan
          // Patch Neraca Saldo
          tempIdNeracaSaldo = await axios.patch(
            `${tempUrl}/neracaSaldos/${tempNeracaSaldo.data[0]._id}`,
            {
              kredit:
                tempNeracaSaldo.data[0].kredit +
                (parseInt(kredit) - parseInt(debet))
            }
          );
          if (kelompokAccount === "220") {
            // Kredit Modal
            // alert("Masuk Kredit Modal");
            await axios.patch(
              `${tempUrl}/perubahanModals/${tempPerubahanModal.data[0]._id}`,
              {
                modalSaham:
                  tempNeracaSaldo.data[0].kredit +
                  (parseInt(kredit) - parseInt(debet)),
                total:
                  tempNeracaSaldo.data[0].kredit +
                  (parseInt(kredit) - parseInt(debet))
              }
            );
          }
          // Patch Laba Rugi
          if (kelompokAccount === "301") {
            // Laba Rugi Pendapatan Kredit
            tempLabaRugiTransaksiOther.data.push({
              idNeracaSaldo: tempIdNeracaSaldo.data._id,
              kodeAccount,
              namaAccount,
              kelompokAccount: kodeAccount.slice(0, 3),
              total:
                tempLabaRugiTransaksi.data[0].total +
                (parseInt(kredit) - parseInt(debet))
            });
            await axios.patch(
              `${tempUrl}/labaRugis/${tempLabaRugi.data[0]._id}`,
              {
                tanggal: tempLabaRugi.data[0].tanggal,
                transaksi: tempLabaRugiTransaksiOther.data,
                totalPendapatan:
                  tempLabaRugi.data[0].totalPendapatan + parseInt(kredit),
                totalHPP: tempLabaRugi.data[0].totalHPP,
                totalBebanOperasional:
                  tempLabaRugi.data[0].totalBebanOperasional,
                labaKotor: tempLabaRugi.data[0].labaKotor + parseInt(kredit),
                labaBersih: tempLabaRugi.data[0].labaBersih + parseInt(kredit)
              }
            );
            // alert("Hit Pendapatan Perubahan Modal");
            await axios.patch(
              `${tempUrl}/perubahanModals/${tempPerubahanModal.data[0]._id}`,
              {
                labaBersih: tempLabaRugi.data[0].labaBersih + parseInt(kredit),
                total: tempPerubahanModal.data[0].total + parseInt(kredit)
              }
            );
          }
        }
      } else {
        // alert("Hit before 2");
        bukuBesars.filter((val, index) => {
          if (val.kode === kodeAccount) {
            tempJenisAccount = val.jenisSaldo;
          }
        });
        // Post Neraca Saldo
        // alert("Hit before 1");
        tempIdNeracaSaldo = await axios.post(`${tempUrl}/neracaSaldos`, {
          tanggal,
          jenisAccount: tempJenisAccount,
          kodeAccount,
          namaAccount,
          debet,
          kredit
        });
        // Patch Laba Rugi
        // alert("Hit 1");
        if (kelompokAccount === "301") {
          // KREDIT PENJUALAN
          // aaaaaaaa
          // alert("Hit kredit penjualan");
          tempLabaRugiTransaksiOther.data.push({
            idNeracaSaldo: tempIdNeracaSaldo.data._id,
            kodeAccount,
            namaAccount,
            kelompokAccount: kodeAccount.slice(0, 3),
            total: parseInt(kredit) - parseInt(debet)
          });
          await axios.patch(
            `${tempUrl}/labaRugis/${tempLabaRugi.data[0]._id}`,
            {
              tanggal: tempLabaRugi.data[0].tanggal,
              transaksi: tempLabaRugiTransaksiOther.data,
              totalPendapatan:
                tempLabaRugi.data[0].totalPendapatan + parseInt(kredit),
              totalHPP: tempLabaRugi.data[0].totalHPP,
              totalBebanOperasional: tempLabaRugi.data[0].totalBebanOperasional,
              labaKotor: tempLabaRugi.data[0].labaKotor + parseInt(kredit),
              labaBersih: tempLabaRugi.data[0].labaBersih + parseInt(kredit)
            }
          );
          // alert("Hit Pendapatan Perubahan Modal");
          await axios.patch(
            `${tempUrl}/perubahanModals/${tempPerubahanModal.data[0]._id}`,
            {
              labaBersih: tempLabaRugi.data[0].labaBersih + parseInt(kredit),
              total: tempPerubahanModal.data[0].total + parseInt(kredit)
            }
          );
        } else if (
          parseInt(kelompokAccount) >= 302 &&
          parseInt(kelompokAccount) <= 304
        ) {
          // DEBET HPP
          // alert("Hit debet hpp");
          tempLabaRugiTransaksi.data.push({
            idNeracaSaldo: tempIdNeracaSaldo.data._id,
            kodeAccount,
            namaAccount,
            kelompokAccount: kodeAccount.slice(0, 3),
            total: parseInt(debet) - parseInt(kredit)
          });
          await axios.patch(
            `${tempUrl}/labaRugis/${tempLabaRugi.data[0]._id}`,
            {
              tanggal: tempLabaRugi.data[0].tanggal,
              transaksi: tempLabaRugiTransaksi.data,
              totalPendapatan: tempLabaRugi.data[0].totalPendapatan,
              totalHPP: tempLabaRugi.data[0].totalHPP + parseInt(debet),
              totalBebanOperasional: tempLabaRugi.data[0].totalBebanOperasional,
              labaKotor: tempLabaRugi.data[0].labaKotor - parseInt(debet),
              labaBersih: tempLabaRugi.data[0].labaBersih - parseInt(debet)
            }
          );
          // alert("Hit HPP Perubahan Modal");
          await axios.patch(
            `${tempUrl}/perubahanModals/${tempPerubahanModal.data[0]._id}`,
            {
              labaBersih: tempLabaRugi.data[0].labaBersih - parseInt(debet),
              total: tempPerubahanModal.data[0].total - parseInt(debet)
            }
          );
        } else if (
          parseInt(kelompokAccount) >= 310 &&
          parseInt(kelompokAccount) <= 320
        ) {
          // DEBET BIAYA
          // alert("Hit debet biaya");
          tempLabaRugiTransaksi.data.push({
            idNeracaSaldo: tempIdNeracaSaldo.data._id,
            kodeAccount,
            namaAccount,
            kelompokAccount: kodeAccount.slice(0, 3),
            total: parseInt(debet) - parseInt(kredit)
          });
          await axios.patch(
            `${tempUrl}/labaRugis/${tempLabaRugi.data[0]._id}`,
            {
              tanggal: tempLabaRugi.data[0].tanggal,
              transaksi: tempLabaRugiTransaksi.data,
              totalPendapatan: tempLabaRugi.data[0].totalPendapatan,
              totalHPP: tempLabaRugi.data[0].totalHPP,
              totalBebanOperasional:
                tempLabaRugi.data[0].totalBebanOperasional + parseInt(debet),
              labaKotor: tempLabaRugi.data[0].labaKotor,
              labaBersih: tempLabaRugi.data[0].labaBersih - parseInt(debet)
            }
          );
          // alert("Hit Biaya Perubahan Modal");
          await axios.patch(
            `${tempUrl}/perubahanModals/${tempPerubahanModal.data[0]._id}`,
            {
              labaBersih: tempLabaRugi.data[0].labaBersih - parseInt(debet),
              total: tempPerubahanModal.data[0].total - parseInt(debet)
            }
          );
        }
      }
      // alert("Hit 3");

      // Post Laporan Buku Besar
      let tempLaporanBukuBesar = await axios.post(
        `${tempUrl}/laporanBukuBesars`,
        {
          kodeBukuBesar: kodeAccount,
          tanggal,
          noJurnalUmum: jurnalUmums.noJurnalUmum,
          keterangan,
          debet,
          kredit
        }
      );

      // Post A Jurnal Umum
      await axios.post(`${tempUrl}/aJurnalUmums`, {
        noJurnalUmum: jurnalUmums.noJurnalUmum,
        idNeracaSaldo: tempIdNeracaSaldo.data,
        idLaporanBukuBesar: tempLaporanBukuBesar.data,
        tanggal,
        kodeAccount,
        namaAccount,
        keterangan,
        debet,
        kredit
      });

      // Patch Jurnal Umum
      await axios.patch(`${tempUrl}/jurnalUmums/${id}`, {
        totalDebet: jurnalUmums.totalDebet + parseInt(debet),
        totalKredit: jurnalUmums.totalKredit + parseInt(kredit),
        balance: jurnalUmums.balance + (debet - kredit)
      });
      setLoading(false);
      navigate(
        `/daftarJurnalUmum/jurnalUmum/${id}/${jurnalUmums.noJurnalUmum}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ p: 2, pt: 5 }}>
      <Typography color="#757575">Jurnal Umum</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Entry Jurnal Buku Besar
      </Typography>
      <Divider sx={{ mt: 2 }} />
      <form onSubmit={handleSubmit(saveUser)}>
        <Box
          sx={{
            mt: 4,
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
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={bukuBesarOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register("kodeAccount", {
                      required: "Kode Account harus diisi!"
                    })}
                    error={!!errors?.kodeAccount}
                    helperText={
                      errors?.kodeAccount ? errors.kodeAccount.message : null
                    }
                  />
                )}
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                onInputChange={(e, value) => setAccount(value)}
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography sx={{ margin: 1, fontWeight: "500" }}>
                Tanggal
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={tanggal}
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                {...register("tanggal", {
                  required: "Tanggal harus diisi!"
                })}
                error={!!errors?.tanggal}
                helperText={errors?.tanggal ? errors.tanggal.message : null}
                onChange={(e) => setTanggal(e.target.value)}
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography sx={{ margin: 1, fontWeight: "500" }}>
                Keterangan
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={keterangan}
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                onChange={(e) => setKeterangan(e.target.value)}
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography sx={{ margin: 1, fontWeight: "500" }}>
                Debet{" "}
                {debet !== 0 &&
                  !isNaN(parseInt(debet)) &&
                  ` : Rp ${parseInt(debet).toLocaleString()}`}
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={debet}
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                onChange={(e) => {
                  setDebet(e.target.value);
                }}
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography sx={{ margin: 1, fontWeight: "500" }}>
                Kredit{" "}
                {kredit !== 0 &&
                  !isNaN(parseInt(kredit)) &&
                  ` : Rp ${parseInt(kredit).toLocaleString()}`}
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={kredit}
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                onChange={(e) => {
                  setKredit(e.target.value);
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
            Simpan
          </Button>
        </Box>
      </form>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default TambahAJurnalUmum;
