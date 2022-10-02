import * as uuid from 'uuid';

import { EmployeeItem } from '../models/EmployeeItem';
import { EmployeeAccess } from '../dataLayer/employeesAcess';
import { CreateEmployeeRequest } from '../requests/CreateEmployeeRequest';
import { UpdateEmployeeRequest } from '../requests/UpdateEmployeeRequest';

const employeeAccess = new EmployeeAccess()

export async function getEmployees(userId: string): Promise<EmployeeItem[]> {
  return employeeAccess.getEmployeesForUser(userId);
}
export async function updateEmployee(userId: string, id: string, payload: UpdateEmployeeRequest) : Promise<void>{
  return employeeAccess.updateEmployee(userId, id, payload);
}
export async function getEmployee(userId: string, EmployeeId: string): Promise<EmployeeItem> {
  return employeeAccess.getEmployee(userId, EmployeeId);
}

export async function updateEmployeeAttachment(userId: string, id: string): Promise<void> {
  return employeeAccess.GenerateUploadUrl(userId, id);
}

export async function deleteEmployee(userId: string, id: string): Promise<void> {
  return employeeAccess.deleteEmployee(userId, id);
}

export async function createEmployee(
  createEmployeeRequest: CreateEmployeeRequest,
  userId: string
): Promise<EmployeeItem> {
  const employeeId = uuid.v4();

  return await employeeAccess.createEmployee({
    userId,
    employeeId,
    name: createEmployeeRequest.name,
    createdAt: new Date().toISOString(),
    department: createEmployeeRequest.department,
    attachmentUrl: null,
  })
}

export async function EmployeeExists(id: string): Promise<boolean> {
  return await employeeAccess.employeeExists(id);
}
