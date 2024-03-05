// @ts-check

const employeeDB = {
  employees: [],
  create(name, position, department) {
    this.employees.push({ name, position, department });
  },
  read() {
    return this.employees;
  },
  update(name, position, department) {
    this.employees = this.employees.map((item) => {
      const newItem = { ...item };
      if (newItem.name === name) {
        if (position) {
          newItem.position = position;
        }
        if (department) {
          newItem.department = department;
        }
      }
      return newItem;
    });
  },
  delete(name) {
    const index = this.employees.findIndex((item) => item.name === name);
    if (index !== -1) {
      delete this.employees[index];
    }
  },
  formatted() {
    this.employees = this.employees.map((item) => {
      const newItem = { ...item };
      newItem.name = newItem.name.toUpperCase();
      newItem.department = newItem.department.toLowerCase();
      return newItem;
    });
  },
  clone() {
    return {
      ...this,
      employees: this.employees.map((item) => ({ ...item })),
    };
  },
  merge(otherObject) {
    otherObject.read().forEach((otherItem) => {
      if (this.read().findIndex((item) => item.name === otherItem.name) === -1) {
        this.create(otherItem.name, otherItem.position, otherItem.department);
      }
    });
  },
  uniqueDepartments() {
    const departments = new Set();
    this.employees.forEach(({ department }) => {
      departments.add(department);
    });
    return Array(...departments);
  },
  isEqual(employee1, employee2, keys) {
    for (let i = 0; i < keys.length; i += 1) {
      if (employee1[keys[i]] !== employee2[keys[i]]) {
        return false;
      }
    }
    return true;
  },
};

export default employeeDB;
