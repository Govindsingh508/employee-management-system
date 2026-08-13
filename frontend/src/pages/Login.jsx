import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Alert
} from "@mui/material";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (event) => {

        event.preventDefault();
        setError("");

        try {

            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    username: username,
                    password: password,
                }),
                credentials: "include",
            });

            if (response.ok || response.redirected) {
                navigate("/dashboard");
            } else {
                setError("Invalid username or password");
            }

        } catch (error) {
            console.error(error);
            setError("Unable to connect to server");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    width: 350,
                }}
            >

                <Typography
                    variant="h4"
                    sx={{ mb: 3, textAlign: "center" }}
                >
                    Login
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleLogin}>

                    <TextField
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(event) =>
                            setUsername(event.target.value)
                        }
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        sx={{ mb: 3 }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                    >
                        Login
                    </Button>

                </Box>

            </Paper>

        </Box>
    );
}

export default Login;