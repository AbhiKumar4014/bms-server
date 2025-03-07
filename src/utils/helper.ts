export function buildHierarchy(result: any) {
    const employeesMap = new Map();

    let hierarchy = null;

    // Iterate through the result to build the employee nodes
    result.forEach(({level, ...employee}) => {
        employee.subordinates = [];

        employeesMap.set(employee?.id, employee);

        if (employee?.id === employee?.manager_id) {
            hierarchy = employee;
        }
    });

    // Second pass to build the hierarchy
    result.forEach(({ id, manager_id }) => {
        if (id !== manager_id) {
            const employee = employeesMap.get(id);
            const manager = employeesMap.get(manager_id);

            if (manager) {
                manager.subordinates.push(employee);
            }
        }
    });

    return hierarchy;
}