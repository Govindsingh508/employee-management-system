import { useEffect , useState} from "react";
import MainLayout from "../layouts/MainLayout";
import { Typography, Table, TableBody, TableHead, TableRow, TableCell, 
    Pagination, Button, TextField, 
    Input} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getEmployees, deleteEmployee, searchEmployees } from "../services/employeeServices";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";

function Employees() {
    const [employees, setEmployees] = useState([]);
    const[page, setPage] = useState(0);
    const[size, setSize] = useState(5);
    const[totalPages, setTotalPages] = useState(0);
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState("");
    const navigate = useNavigate();
    const[searchName, setSearchName] = useState("");
    const[departmentFilter, setDepartmentFilter] = useState("");

  useEffect(() => {

    setLoading(true);
    setError("");

    getEmployees(page, size)
      .then((response) => {
        setEmployees(response.data.content);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch employees");
        setLoading(false);
      });

  }, [page, size]);

  
    const handleSearch = () => {

    
        if (!searchName.trim()) {
            getEmployees(page, size)
                .then((response) => {
                    setEmployees(response.data.content);
                    setTotalPages(response.data.totalPages);
                })
                .catch((error) => {
                    console.error(error);
                    setError("Failed to fetch employees");
                });

            return;
        }

        searchEmployees(searchName)
            .then((response) => {
                setEmployees(response.data);
                setTotalPages(1);
            })
            .catch((error) => {
                console.error(error);
                setError("Failed to search employees");
            });
};


const handleClearSearch = () => {

    setSearchName("");
    setDepartmentFilter("");
    setPage(0);

    getEmployees(0, size)
        .then((response) => {
            setEmployees(response.data.content);
            setTotalPages(response.data.totalPages);
        })
        .catch((error) => {
            console.error(error);
            setError("Failed to fetch employees");
        });
    };

  const handleDelete = (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");

    if (!confirmDelete) {
        return;
    }

    deleteEmployee(id)
        .then(() => {
            // Refresh the employee list after deletion
            getEmployees(page, size)
                .then((response) => {
                    setEmployees(response.data.content);
                    setTotalPages(response.data.totalPages);
                });
        })
        .catch((error) => {
            console.error(error);
            setError("Failed to delete employee");
        });
};

const filteredEmployees = employees.filter((employee) => {

    const matchesDepartment = !departmentFilter || employee.department === departmentFilter ;
     
    return matchesDepartment;
});

  return (
    <MainLayout>

        <Typography variant="h4" sx={{ mb: 2 }}>
            Employees
        </Typography>


        <Typography sx={{ mb: 2}}>
            Total Employees: {employees.length}
        </Typography>

        <Button 
            variant="contained" 
            onClick={() => navigate("/employees/create")}
            sx={{ mb: 2 }}
        >
            Create Employee
        </Button>

        
        {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
                {error}
            </Alert>
        )}

        <Box
            sx={{
                display: "flex",
                gap: 2,
                mb: 3,
            }}
        >
            <TextField
                size="small"
                label="Search by employee name"
                value={searchName}
                onChange={(event) => setSearchName(event.target.value)}
            />

            <Button
                variant="contained"
            onClick={handleSearch}
            >
                Search
            </Button>

            <Button
                variant="outlined"
                onClick={handleClearSearch}
            >
                Clear 
            </Button>

            <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Department</InputLabel>

                <Select
                    value={departmentFilter}
                    label="Department"
                    onChange={(event) => setDepartmentFilter(event.target.value)}
                >
                    <MenuItem value="">All Departments</MenuItem>
                    <MenuItem value="IT">IT</MenuItem>
                    <MenuItem value="Cloud">Cloud</MenuItem>
                    <MenuItem value="DevOps">DevOps</MenuItem>
                    <MenuItem value="HR">HR</MenuItem>
                    <MenuItem value="Developer">Developer</MenuItem>
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem value="Marketing">Marketing</MenuItem>
                    <MenuItem value="Support">Support</MenuItem>
                    <MenuItem value="Testing">Testing</MenuItem>
                    <MenuItem value="Design">Design</MenuItem>
                </Select>
            </FormControl>
        </Box>

        <Table>

            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Department</TableCell>

                    <TableCell>Actions</TableCell>

                </TableRow>

            </TableHead>


            <TableBody>

                {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>

                        <TableCell>
                            {employee.id}
                        </TableCell>

                        <TableCell>
                            {employee.firstName} {employee.lastName}
                        </TableCell>

                        <TableCell>
                            {employee.email}
                        </TableCell>

                        <TableCell>
                            {employee.department}
                        </TableCell> 

                        <TableCell>
                            <Button 
                                size="small"
                                variant="outlined"
                                onClick={() => navigate(`/employees/edit/${employee.id}`)}
                                sx={{ mr: 1 }}
                            >
                                Edit
                            </Button>

                            <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => handleDelete(employee.id)}
                            >
                                Delete
                            </Button>
                        </TableCell>

                    </TableRow>
                ))}

            </TableBody>

        </Table>

        <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        mt: 3,
    }}
        >
            <Pagination
                count={totalPages}
                page={page + 1}
                onChange={(event, value) => setPage(value - 1)}
            />

            <FormControl size="small" sx={{ minWidth: 80 }}>
                <Select
                    value={size}
                    onChange={(event) => {
                        setSize(event.target.value);
                        setPage(0);
                    }}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                </Select>
            </FormControl>
        </Box>


    </MainLayout>
);
}

export default Employees;