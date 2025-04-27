import { useState } from "react";
import { User, AtSign, Lock } from "lucide-react";
import { Box, Button, Container, Paper, TextField, Typography, InputAdornment } from "@mui/material";
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Field, Form } from 'formik';
import axios from "axios";
import * as Yup from 'yup';

const Register = () => {
  // Validation Schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", values);
      toast.success(response.data.message || "Registration successful 🎉", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        transition: Slide,
      });
    } catch (error) {
      toast.error("Error registering user ❌", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
    }
    setSubmitting(false);
  };

  return (
    <Container
      maxWidth="none"
      sx={{
        padding: 0,
        margin: 0,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #2a2a4b, #6f67a1)",
        animation: "fadeIn 2s ease-in-out",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: 5,
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 25px rgba(138, 43, 226, 0.3)",
          transform: "perspective(1000px) rotateX(2deg)",
          animation: "zoomIn 1.5s ease-in-out",
        }}
      >
        <Typography variant="h4" align="center" color="white" fontWeight="bold" mb={4}>
          Register
        </Typography>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form>
              <Box display="flex" flexDirection="column" gap={3}>
                <Field name="username">
                  {({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      placeholder="Username"
                      fullWidth
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <User size={20} color="#fff" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(255,255,255,0.1)",
                          borderRadius: 2,
                          transition: "0.3s",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: touched.username && errors.username ? "#f44336" : "rgba(255,255,255,0.2)",
                        },
                      }}
                    />
                  )}
                </Field>

                <Field name="email">
                  {({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      placeholder="Email"
                      fullWidth
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AtSign size={20} color="#fff" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(255,255,255,0.1)",
                          borderRadius: 2,
                          transition: "0.3s",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: touched.email && errors.email ? "#f44336" : "rgba(255,255,255,0.2)",
                        },
                      }}
                    />
                  )}
                </Field>

                <Field name="password">
                  {({ field }) => (
                    <TextField
                      {...field}
                      type="password"
                      variant="outlined"
                      placeholder="Password"
                      fullWidth
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock size={20} color="#fff" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(255,255,255,0.1)",
                          borderRadius: 2,
                          transition: "0.3s",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: touched.password && errors.password ? "#f44336" : "rgba(255,255,255,0.2)",
                        },
                      }}
                    />
                  )}
                </Field>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{
                    py: 1.5,
                    mt: 2,
                    backgroundColor: "#7c3aed",
                    boxShadow: "0 4px 20px rgba(124, 58, 237, 0.5)",
                    borderRadius: 2,
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#6d28d9",
                    },
                  }}
                >
                  Register
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default Register;
