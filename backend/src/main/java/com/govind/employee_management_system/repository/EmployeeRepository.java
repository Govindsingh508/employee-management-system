package com.govind.employee_management_system.repository;

import com.govind.employee_management_system.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    List<Employee> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase
            (
            String firstName,
            String lastName);

    long countByDepartment(String department);
}
