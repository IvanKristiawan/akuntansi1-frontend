import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Box, TextField, Typography, Divider, Pagination } from "@mui/material";
import { Loader } from "../../components";
import ButtonModifierForProfil from "./components/ButtonModifierForProfil";
import { tempUrl } from "../../contexts/ContextProvider";
import { useStateContext } from "../../contexts/ContextProvider";
import { AuthContext } from "../../contexts/AuthContext";

const Profil = () => {
  const { user, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[1];
  const { screenSize } = useStateContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const logout = async (e) => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  useEffect(() => {
    getAJurnalUmums();
  }, []);

  const getAJurnalUmums = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/users/${user._id}`);
    setUsername(response.data.username);
    setEmail(response.data.email);
    setLoading(false);
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${tempUrl}/users/${user._id}`);
      setLoading(false);
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ p: 2, pt: 5 }}>
      <Typography color="#757575">Akun</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Profil
      </Typography>

      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        <ButtonModifierForProfil
          id={id}
          kode={"profil"}
          addLink={`/`}
          editLink={`/profil/${user._id}/edit`}
          deleteUser={deleteUser}
          user={user}
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
            <Typography sx={{ margin: 1, fontWeight: "500" }}>
              Username
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
              value={username}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography sx={{ margin: 1, fontWeight: "500" }}>Email</Typography>
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
              value={email}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profil;
