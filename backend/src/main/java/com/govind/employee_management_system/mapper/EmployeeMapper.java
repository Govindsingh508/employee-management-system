package com.govind.employee_management_system.mapper;


import com.govind.employee_management_system.dto.EmployeeRequest;
import com.govind.employee_management_system.dto.EmployeeResponse;
import com.govind.employee_management_system.entity.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {

    Employee toEntity(EmployeeRequest employeeRequest);

    EmployeeResponse toResponse(Employee employee);

    List<EmployeeResponse> toResponseList(List<Employee> employees);

    void updateEmployeeFromRequest(EmployeeRequest request,
                                   @MappingTarget Employee employee);
}
