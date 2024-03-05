// @ts-check

import { test, expect, beforeEach } from '@jest/globals';
import employeeDB from '../index.js';

beforeEach(() => {
  employeeDB.employees = [];
});

test('create', () => {
  const employee = { name: 'Ivan', position: 'Test', department: 'QA' };
  employeeDB.create(employee.name, employee.position, employee.department);
  expect(employeeDB.employees[0]).toEqual(employee);
});

test('read', () => {
  const employee1 = { name: 'Ivan', position: 'Test', department: 'QA' };
  const employee2 = { name: 'Maksim', position: 'Dev', department: 'Frontend' };
  const employee3 = { name: 'Alex', position: 'Dev', department: 'Backend' };
  employeeDB.create(employee1.name, employee1.position, employee1.department);
  employeeDB.create(employee2.name, employee2.position, employee2.department);
  employeeDB.create(employee3.name, employee3.position, employee3.department);
  const result = employeeDB.read();
  expect(result).toEqual([employee1, employee2, employee3]);
});

test('update', () => {
  const employee1 = { name: 'Ivan', position: 'Test', department: 'QA' };
  const employee2 = { name: 'Maksim', position: 'Dev', department: 'Frontend' };
  const employee3 = { name: 'Alex', position: 'Dev', department: 'Backend' };
  employeeDB.create(employee1.name, employee1.position, employee1.department);
  employeeDB.create(employee2.name, employee2.position, employee2.department);
  employeeDB.create(employee3.name, employee3.position, employee3.department);
  employeeDB.update('Alex', null, 'Fullstack');
  expect(employeeDB.employees[2]).toEqual({ ...employee3, department: 'Fullstack' });
});

test('delete', () => {
  const employee1 = { name: 'Ivan', position: 'Test', department: 'QA' };
  const employee2 = { name: 'Maksim', position: 'Dev', department: 'Frontend' };
  const employee3 = { name: 'Alex', position: 'Dev', department: 'Backend' };
  employeeDB.create(employee1.name, employee1.position, employee1.department);
  employeeDB.create(employee2.name, employee2.position, employee2.department);
  employeeDB.create(employee3.name, employee3.position, employee3.department);
  employeeDB.delete('Ivan');
  expect(employeeDB.employees).toEqual([undefined, employee2, employee3]);
});

test('formatted', () => {
  const employee1 = { name: 'Ivan', position: 'Test', department: 'QA' };
  const employee2 = { name: 'Maksim', position: 'Dev', department: 'Frontend' };
  const employee3 = { name: 'Alex', position: 'Dev', department: 'Backend' };
  employeeDB.create(employee1.name, employee1.position, employee1.department);
  employeeDB.create(employee2.name, employee2.position, employee2.department);
  employeeDB.create(employee3.name, employee3.position, employee3.department);
  employeeDB.formatted();
  expect(employeeDB.employees).toEqual([
    {
      ...employee1,
      name: employee1.name.toUpperCase(),
      department: employee1.department.toLowerCase(),
    },
    {
      ...employee2,
      name: employee2.name.toUpperCase(),
      department: employee2.department.toLowerCase(),
    },
    {
      ...employee3,
      name: employee3.name.toUpperCase(),
      department: employee3.department.toLowerCase(),
    },
  ]);
});

test('clone', () => {
  const employee1 = { name: 'Ivan', position: 'Test', department: 'QA' };
  const employee2 = { name: 'Maksim', position: 'Dev', department: 'Frontend' };
  const employee3 = { name: 'Alex', position: 'Dev', department: 'Backend' };
  employeeDB.create(employee1.name, employee1.position, employee1.department);
  employeeDB.create(employee2.name, employee2.position, employee2.department);
  employeeDB.create(employee3.name, employee3.position, employee3.department);
  const newEmployeeDB = employeeDB.clone();
  expect(newEmployeeDB).toEqual(employeeDB);
  expect(newEmployeeDB).not.toBe(employeeDB);
  expect(newEmployeeDB.employees[0]).not.toBe(employeeDB.employees[0]);
  expect(newEmployeeDB.employees[1]).not.toBe(employeeDB.employees[1]);
  expect(newEmployeeDB.employees[2]).not.toBe(employeeDB.employees[2]);
  expect(newEmployeeDB.create).toBeDefined();
  expect(newEmployeeDB.read).toBeDefined();
  expect(newEmployeeDB.update).toBeDefined();
  expect(newEmployeeDB.delete).toBeDefined();
});

test('merge', () => {
  const employee1 = { name: 'Ivan', position: 'Test', department: 'QA' };
  const employee2 = { name: 'Maksim', position: 'Dev', department: 'Frontend' };
  const employee3 = { name: 'Alex', position: 'Dev', department: 'Backend' };
  const otherDB = employeeDB.clone();
  otherDB.employees = [];
  employeeDB.create(employee1.name, employee1.position, employee1.department);
  employeeDB.create(employee2.name, employee2.position, employee2.department);
  otherDB.create(employee2.name, employee2.position, employee2.department);
  otherDB.create(employee3.name, employee3.position, employee3.department);
  employeeDB.merge(otherDB);
  expect(employeeDB.employees[0]).toEqual(employee1);
  expect(employeeDB.employees[1]).toEqual(employee2);
  expect(employeeDB.employees[2]).toEqual(employee3);
});

test('uniqueDepartments', () => {
  const employee1 = { name: 'Ivan', position: 'Test', department: 'QA' };
  const employee2 = { name: 'Maksim', position: 'Dev', department: 'Frontend' };
  const employee3 = { name: 'Alex', position: 'Dev', department: 'Backend' };
  const employee4 = { name: 'Fill', position: 'Dev', department: 'Backend' };
  employeeDB.create(employee1.name, employee1.position, employee1.department);
  employeeDB.create(employee2.name, employee2.position, employee2.department);
  employeeDB.create(employee3.name, employee3.position, employee3.department);
  employeeDB.create(employee4.name, employee4.position, employee4.department);
  const result = employeeDB.uniqueDepartments();
  expect(result).toEqual(['QA', 'Frontend', 'Backend']);
});

test('isEqual', () => {
  const employee1 = { name: 'Ivan', position: 'Test', department: 'QA' };
  const employee2 = { name: 'Maksim', position: 'Dev', department: 'Frontend' };
  const employee3 = { name: 'Alex', position: 'Dev', department: 'Backend' };
  const employee4 = { name: 'Fill', position: 'Dev', department: 'Backend' };
  expect(employeeDB.isEqual(employee2, employee3, ['position'])).toBeTruthy();
  expect(employeeDB.isEqual(employee1, employee3, ['position'])).toBeFalsy();
  expect(employeeDB.isEqual(employee3, employee4, ['position', 'department'])).toBeTruthy();
  expect(employeeDB.isEqual(employee2, employee4, ['position', 'department'])).toBeFalsy();
});
