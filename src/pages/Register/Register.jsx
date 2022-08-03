import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { tempUrl } from "../../contexts/ContextProvider";
import {
  Box,
  Typography,
  Paper,
  Alert,
  Button,
  TextField,
  Snackbar
} from "@mui/material";

const Register = () => {
  const [open, setOpen] = useState(false);
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post(`${tempUrl}/auth/register`, credentials);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      const res2 = await axios.post(`${tempUrl}/auth/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res2.data.details });
      navigate("/");
    } catch (err) {
      setOpen(true);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        p: 3,
        m: "auto"
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5">Register</Typography>
      </Box>
      <TextField
        id="username"
        label="Username"
        onChange={handleChange}
        sx={{ mt: 2 }}
      />
      <TextField
        id="email"
        label="Email"
        onChange={handleChange}
        sx={{ mt: 2 }}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={handleChange}
        sx={{ mt: 2 }}
      />
      <Button
        disabled={loading}
        onClick={handleClick}
        variant="contained"
        sx={{ mt: 2 }}
      >
        Login
      </Button>
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error.message}
          </Alert>
        </Snackbar>
      )}
    </Paper>
  );
};

export default Register;
