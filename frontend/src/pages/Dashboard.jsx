import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Typography, Box, Paper } from "@mui/material";
import {
    getTotalEmployees,
    getEmployeesByDepartment
} from "../services/employeeServices";

function Dashboard() {

    const [totalEmployees, setTotalEmployees] = useState(0);
    const [cloudEmployees, setCloudEmployees] = useState(0);
    const [itEmployees, setItEmployees] = useState(0);
    const [devOpsEmployees, setDevOpsEmployees] = useState(0);
    const [hrEmployees, setHrEmployees] = useState(0);

    useEffect(() => {

        getTotalEmployees()
            .then((response) => {
                setTotalEmployees(response.data);
            });

        getEmployeesByDepartment("Cloud")
            .then((response) => {
                setCloudEmployees(response.data);
            });

        getEmployeesByDepartment("IT")
            .then((response) => {
                setItEmployees(response.data);
            });

        getEmployeesByDepartment("DevOps")
            .then((response) => {
                setDevOpsEmployees(response.data);
            });

        getEmployeesByDepartment("HR")
            .then((response) => {
                setHrEmployees(response.data);
            });

    }, []);

    return (
        <MainLayout>

            <Typography variant="h4" sx={{ mb: 3 }}>
                Dashboard
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                }}
            >

                <Paper sx={{ p: 3, minWidth: 180 }}>
                    <Typography variant="h6">
                        Total Employees
                    </Typography>

                    <Typography variant="h4">
                        {totalEmployees}
                    </Typography>
                </Paper>

                <Paper sx={{ p: 3, minWidth: 180 }}>
                    <Typography variant="h6">
                        Cloud
                    </Typography>

                    <Typography variant="h4">
                        {cloudEmployees}
                    </Typography>
                </Paper>

                <Paper sx={{ p: 3, minWidth: 180 }}>
                    <Typography variant="h6">
                        IT
                    </Typography>

                    <Typography variant="h4">
                        {itEmployees}
                    </Typography>
                </Paper>

                <Paper sx={{ p: 3, minWidth: 180 }}>
                    <Typography variant="h6">
                        DevOps
                    </Typography>

                    <Typography variant="h4">
                        {devOpsEmployees}
                    </Typography>
                </Paper>

                <Paper sx={{ p: 3, minWidth: 180 }}>
                    <Typography variant="h6">
                        HR
                    </Typography>

                    <Typography variant="h4">
                        {hrEmployees}
                    </Typography>
                </Paper>

            </Box>

        </MainLayout>
    );
}

export default Dashboard;