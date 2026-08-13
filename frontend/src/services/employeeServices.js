import api from "./api";

export const getEmployees = (page, size) => {
    return api.get(`/employees?page=${page}&size=${size}`);
};

export const getEmployeeById = (id) => {
    return api.get(`/employees/${id}`);
};

export const searchEmployees = (name) => {
    return api.get(`/employees/search?name=${name}`);
};

export const createEmployee = (employee) => {
    return api.post("/employees", employee);
};

export const updateEmployee = (id, employee) => {
    return api.put(`/employees/${id}`, employee);
};

export const deleteEmployee = (id) => {
    return api.delete(`/employees/${id}`);
};

export const getTotalEmployees = () => {
    return api.get("/employees/count");
};

export const getEmployeesByDepartment = (department) => {
    return api.get(`/employees/count/department?department=${department}`);
};