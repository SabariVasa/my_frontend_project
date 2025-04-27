import { useState } from "react";
import axios from "axios";
import { User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Paper, TextField, Typography, InputAdornment } from "@mui/material";
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ThreeLoader from "../ThreeBackground/ThreeLoader";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", formData);
      const { emessage, estatus, access } = response.data;

      if (estatus) {
        localStorage.setItem("token", access);
        setLoading(true);
        document.cookie = `token=${access}; path=/; max-age=3600; Secure; SameSite=Strict`;
        toast.success(emessage || "Login successful 🎉", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          transition: Slide,
        });

        // Delayed navigation after showing toast
        setTimeout(() => {
          navigate("/projects");
        }, 2200);
      } else {
        setLoading(false);
        toast.error(emessage || "Login failed ❌", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Slide,
        });
      }
    } catch (error) {
      toast.error("Server error ❌", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
    }
  };

  // Navigate to the register page
  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <Container
      maxWidth="none"
      sx={{
        maxWidth: "none",
        padding: 0,
        margin: 0,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #1e1e2f, #3f3f5a)",
      }}
    >
      {loading ? (
        <ThreeLoader />
      ) : (
        <Paper
          elevation={5}
          sx={{
            padding: 5,
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 25px rgba(138, 43, 226, 0.3)",
            transform: "perspective(1000px) rotateX(2deg)",
          }}
        >
          <Typography variant="h4" align="center" color="white" fontWeight="bold" mb={4}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                name="username"
                variant="outlined"
                placeholder="Username"
                onChange={handleChange}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={20} color="#fff" />
                    </InputAdornment>
                  ),
                  style: { color: "white" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 2,
                  },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" },
                  "& .MuiInputLabel-root": { color: "#aaa" },
                }}
              />

              <TextField
                name="password"
                type="password"
                variant="outlined"
                placeholder="Password"
                onChange={handleChange}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} color="#fff" />
                    </InputAdornment>
                  ),
                  style: { color: "white" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 2,
                  },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" },
                  "& .MuiInputLabel-root": { color: "#aaa" },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  mt: 1,
                  backgroundColor: "#7c3aed",
                  boxShadow: "0 4px 20px rgba(124, 58, 237, 0.5)",
                  borderRadius: 2,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#6d28d9",
                  },
                }}
              >
                Login
              </Button>
            </Box>
          </form>

          {/* Sign Up button below login */}
          <Button
            onClick={navigateToRegister}
            variant="text"
            fullWidth
            sx={{
              py: 1.5,
              mt: 2,
              backgroundColor: "transparent",
              color: "#7c3aed",
              border: "2px solid #7c3aed",
              borderRadius: 2,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#7c3aed",
                color: "white",
              },
            }}
          >
            Don't have an account? Sign Up
          </Button>
        </Paper>
      )}
      <ToastContainer />
    </Container>
  );
};

export default Login;
