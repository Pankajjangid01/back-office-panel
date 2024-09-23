import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import "@fontsource/poppins";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
        fontFamily: "Poppins",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
          fontSize: "3rem",
          textAlign: "center",
          textShadow: "1px 1px 2px rgba(255,255,255,0.3)",
        }}
      >
        Back Office Panel
      </Typography>
      <Box
        sx={{
          width: "350px",
          padding: "30px",
          borderRadius: "15px",
          backgroundColor: "#1e293b",
          boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          textAlign={"center"}
          sx={{ color: "#ffffff" }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              style: {
                color: "#ffffff",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#4b5563",
                },
                "&:hover fieldset": {
                  borderColor: "#7dd3fc",
                },
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: {
                color: "#ffffff",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#4b5563",
                },
                "&:hover fieldset": {
                  borderColor: "#7dd3fc",
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: "20px",
              backgroundColor: "#ff4b2b",
              color: "#ffffff",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#ff416c",
                transform: "scale(1.05)",
                transition: "all 0.3s ease",
              },
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
