import { useState } from "react";

import {
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
    Alert,
} from "@mui/material";

import { createEmployee } from "../services/employeeServices";

function CreateEmployee() {

    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        salary: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleChange = (event) => {

        setEmployee({
            ...employee,
            [event.target.name]: event.target.value,
        });

    };


    const handleSubmit = (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");

        createEmployee(employee)
            .then(() => {

                setSuccess("Employee created successfully.");

                setEmployee({
                    firstName: "",
                    lastName: "",
                    email: "",
                    department: "",
                    salary: "",
                });

            })
            .catch((error) => {

                console.error(error);

                setError("Failed to create employee.");

            });

    };


    return (

        <Box>

            <Typography
                variant="h4"
                sx={{ mb: 3 }}
            >
                Create Employee
            </Typography>


            <Paper
                sx={{
                    p: 3,
                    maxWidth: 600,
                }}
            >

                {error && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        {error}
                    </Alert>
                )}


                {success && (
                    <Alert
                        severity="success"
                        sx={{ mb: 2 }}
                    >
                        {success}
                    </Alert>
                )}


                <Stack
                    spacing={2}
                    component="form"
                    onSubmit={handleSubmit}
                >

                    <TextField
                        label="First Name"
                        name="firstName"
                        value={employee.firstName}
                        onChange={handleChange}
                        required
                    />


                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={employee.lastName}
                        onChange={handleChange}
                        required
                    />


                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={employee.email}
                        onChange={handleChange}
                        required
                    />


                    <TextField
                        label="Department"
                        name="department"
                        value={employee.department}
                        onChange={handleChange}
                        required
                    />


                    <TextField
                        label="Salary"
                        name="salary"
                        type="number"
                        value={employee.salary}
                        onChange={handleChange}
                        required
                    />


                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Create Employee
                    </Button>

                </Stack>

            </Paper>

        </Box>

    );
}

export default CreateEmployee;