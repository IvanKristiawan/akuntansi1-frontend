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
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = async (e) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${tempUrl}/auth/login`, {
        username,
        password
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      setOpen(true);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <Box
      sx={{
        m: "auto"
      }}
    >
      <form onSubmit={handleSubmit(handleClick)}>
        <Paper
          elevation={3}
          sx={{
            width: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 3
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h5">Login</Typography>
          </Box>
          <TextField
            id="username"
            label="Username"
            value={username}
            {...register("username", {
              required: "Username harus diisi!"
            })}
            error={!!errors?.username}
            helperText={errors?.username ? errors.username.message : null}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            {...register("password", {
              required: "Password harus diisi!"
            })}
            error={!!errors?.password}
            helperText={errors?.password ? errors.password.message : null}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          {error && (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Username atau Password salah!
              </Alert>
            </Snackbar>
          )}
        </Paper>
      </form>
    </Box>
  );
};

export default Login;
