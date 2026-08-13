package com.govind.employee_management_system.controller;

import com.govind.employee_management_system.dto.EmployeeRequest;
import com.govind.employee_management_system.dto.EmployeeResponse;
import com.govind.employee_management_system.entity.Employee;
import com.govind.employee_management_system.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EmployeeController {

    private EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {

        this.employeeService =employeeService;
    }

    @PostMapping("/employees")
    public ResponseEntity<EmployeeResponse> saveEmployee(
            @Valid @RequestBody EmployeeRequest employeeRequest) {

        EmployeeResponse response = employeeService.saveEmployee(employeeRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/employees")
    public ResponseEntity<Page<EmployeeResponse>> getAllEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sort) {

        Page<EmployeeResponse> response =
                employeeService.getAllEmployees(page, size, sort);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(
            @PathVariable Long id) {

        EmployeeResponse response = employeeService.getEmployeeById(id);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/employees/search")
    public ResponseEntity<List<EmployeeResponse>> searchEmployees(
            @RequestParam String name) {

        List<EmployeeResponse> response =
                employeeService.searchEmployees(name);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/employees/count")
    public ResponseEntity<Long> getTotalEmployees() {

        return ResponseEntity.ok(
                employeeService.getTotalEmployees()
        );
    }

    @GetMapping("/employees/count/department")
    public ResponseEntity<Long> getEmployeesByDepartment(
            @RequestParam String department) {

        return ResponseEntity.ok(
                employeeService.getEmployeesByDepartment(department)
        );
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<EmployeeResponse> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequest employeeRequest) {

        EmployeeResponse response = employeeService.updateEmployee(id, employeeRequest);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Void> deleteEmployee(
            @PathVariable Long id) {
        employeeService.deleteEmployee(id);

        return ResponseEntity.noContent().build();
    }
}
