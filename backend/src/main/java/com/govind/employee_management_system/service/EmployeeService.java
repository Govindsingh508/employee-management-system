package com.govind.employee_management_system.service;

import com.govind.employee_management_system.dto.EmployeeRequest;
import com.govind.employee_management_system.dto.EmployeeResponse;
import com.govind.employee_management_system.entity.Employee;
import com.govind.employee_management_system.exception.EmployeeNotFoundException;
import com.govind.employee_management_system.mapper.EmployeeMapper;
import com.govind.employee_management_system.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private static final Logger logger =
            LoggerFactory.getLogger(EmployeeService.class);
    private EmployeeRepository employeeRepository;
    private EmployeeMapper employeeMapper;

    public EmployeeService(EmployeeRepository employeeRepository,
                           EmployeeMapper employeeMapper) {
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
    }

    public EmployeeResponse saveEmployee(EmployeeRequest employeeRequest) {

        logger.info("saving employee:{}", employeeRequest.getFirstName());

        Employee employee = employeeMapper.toEntity(employeeRequest);

        Employee savedEmployee = employeeRepository.save(employee);

        logger.info("Employee saved successfully.");


        return employeeMapper.toResponse(savedEmployee);
    }

    public Page<EmployeeResponse> getAllEmployees(
            int page,
            int size,
            String sort) {

        Page<Employee> employees =
                employeeRepository.findAll(PageRequest.of(page, size, Sort.by(sort))
                );

        return employees.map(employeeMapper::toResponse);
    }

    public EmployeeResponse getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new EmployeeNotFoundException("Employee with ID" + id + "not found"));

        return employeeMapper.toResponse(employee);
    }

    public EmployeeResponse updateEmployee(Long id,
                                           EmployeeRequest employeeRequest) {
        Employee existingEmployee = employeeRepository.findById(id).orElseThrow(() ->
                new EmployeeNotFoundException("Employee with ID " + id + " not found"));

        employeeMapper.updateEmployeeFromRequest(employeeRequest, existingEmployee);

        Employee updateEmployee = employeeRepository.save(existingEmployee);

        return employeeMapper.toResponse(updateEmployee);
    }

    public List<EmployeeResponse> searchEmployees(String name) {

        List<Employee> employees =
                employeeRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(name, name);

        return employeeMapper.toResponseList(employees);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    public long getTotalEmployees() {
        return employeeRepository.count();
    }

    public long getEmployeesByDepartment(String department) {
        return employeeRepository.countByDepartment(department);
    }
    }
