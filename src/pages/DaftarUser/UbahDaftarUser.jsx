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
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useStateContext } from "../../contexts/ContextProvider";

const UbahDaftarUser = () => {
  const { screenSize } = useStateContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/users/${id}`);
    setUsername(response.data.username);
    setEmail(response.data.email);
    setIsAdmin(response.data.isAdmin);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`${tempUrl}/users/${id}`, {
        username,
        email,
        isAdmin
      });
      setLoading(false);
      navigate(`/daftarUser/${id}`);
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
        Ubah User
      </Typography>
      <Divider sx={{ mt: 2 }} />
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
            <Typography sx={{ margin: 1, fontWeight: "500" }}>Email</Typography>
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
            <FormGroup sx={{ margin: 1 }}>
              {isAdmin ? (
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Admin"
                  onChange={(e) => setIsAdmin(!isAdmin)}
                />
              ) : (
                <FormControlLabel
                  control={<Checkbox />}
                  label="Admin"
                  onChange={(e) => setIsAdmin(!isAdmin)}
                />
              )}
            </FormGroup>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={updateUser}
        >
          Ubah
        </Button>
      </Box>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default UbahDaftarUser;
