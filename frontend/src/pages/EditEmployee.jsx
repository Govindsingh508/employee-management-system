import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
    Alert,
    CircularProgress,
} from "@mui/material";

import {
    getEmployeeById,
    updateEmployee,
} from "../services/employeeServices";

function EditEmployee() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        salary: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        getEmployeeById(id)
            .then((response) => {
                setEmployee(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Failed to load employee.");
                setLoading(false);
            });

    }, [id]);

    const handleChange = (event) => {
        setEmployee({
            ...employee,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        setError("");

        updateEmployee(id, employee)
            .then(() => {
                navigate("/employees");
            })
            .catch((error) => {
                console.error(error);
                setError("Failed to update employee.");
            });
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box>

            <Typography variant="h4" sx={{ mb: 3 }}>
                Update Employee
            </Typography>

            <Paper sx={{ p: 3, maxWidth: 600 }}>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
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

                    <Stack direction="row" spacing={2}>

                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Update Employee
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() => navigate("/employees")}
                        >
                            Cancel
                        </Button>

                    </Stack>

                </Stack>

            </Paper>

        </Box>
    );
}

export default EditEmployee;