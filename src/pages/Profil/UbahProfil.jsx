import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { tempUrl } from "../../contexts/ContextProvider";
import { Loader } from "../../components";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { AuthContext } from "../../contexts/AuthContext";
import { useStateContext } from "../../contexts/ContextProvider";
import { useForm } from "react-hook-form";

const UbahProfil = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { user, dispatch } = useContext(AuthContext);
  const { screenSize } = useStateContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserById();
  }, []);

  const logout = async (e) => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const getUserById = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/users/${id}`);
    setUsername(response.data.username);
    setEmail(response.data.email);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`${tempUrl}/users/${id}`, {
        username,
        email,
        password
      });
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
    <Box sx={{ p: 2, pt: 10 }}>
      <Typography color="#757575">Akun</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Ubah Profil
      </Typography>
      <Divider sx={{ mt: 2 }} />
      <form onSubmit={handleSubmit(updateUser)}>
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
                variant="outlined"
                value={username}
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Box>
            <Box>
              <Typography sx={{ margin: 1, fontWeight: "500" }}>
                Email
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={email}
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box>
              <Typography sx={{ margin: 1, fontWeight: "500" }}>
                Password
              </Typography>
              <TextField
                variant="outlined"
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                {...register("password", {
                  required: "Password harus diisi!"
                })}
                error={!!errors?.password}
                helperText={errors?.password ? errors.password.message : null}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  display: "flex",
                  width: screenSize >= 650 ? "30rem" : "100%"
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Button type="submit" variant="contained" startIcon={<EditIcon />}>
            Ubah
          </Button>
        </Box>
      </form>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default UbahProfil;
