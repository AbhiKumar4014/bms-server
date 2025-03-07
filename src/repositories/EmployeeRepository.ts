import { prisma } from '../app';

class EmployeeRepository {
  async getEmployeeById(employeeId: string) {
    try {
      const employee = await prisma.employee_details.findUnique({
        where: {
          id: employeeId,
        },
      });

      return employee;
    } catch (error) {
      console.error("Error fetching employee by id:", error);
      throw new Error("Failed to fetch employee");
    } finally {
      await prisma.$disconnect();
    }
  }

  async getEmployeeHierarchy(userId: string) {
    try {
      const result = await prisma.$queryRaw`
        WITH EmployeeHierarchy AS (
            -- Base case: Start with the given employee, Level 1
            SELECT
                e.id,
                e.emp_id,
                e.first_name,
                e.last_name,
                e.manager_id,
                d.name AS designation,
                u.email,
                1 AS level -- Initial level set to 1
            FROM employee_details e
            INNER JOIN designation d ON e.designation_id = d.id
            INNER JOIN users u ON e.user_id = u.id
            WHERE e.user_id = CAST(${userId} AS UNIQUEIDENTIFIER)

            UNION ALL

            -- Recursive case: Traverse the hierarchy upwards, incrementing level
            SELECT
                e.id,
                e.emp_id,
                e.first_name,
                e.last_name,
                e.manager_id,
                d.name AS designation,
                u.email,
                eh.level + 1 AS level -- Increment level for each recursion
            FROM employee_details e
            INNER JOIN designation d ON e.designation_id = d.id
            INNER JOIN EmployeeHierarchy eh ON e.id = eh.manager_id
            INNER JOIN users u ON e.user_id = u.id
            WHERE e.id != e.manager_id -- Prevents circular references
        )

        -- Select the hierarchy including the admin with the correct level
        SELECT *
        FROM EmployeeHierarchy

        -- Dynamically assign the correct level to the admin row
        UNION

        SELECT
            e.id,
            e.emp_id,
            e.first_name,
            e.last_name,
            e.manager_id,
            d.name AS designation,
            u.email,
            (SELECT MAX(level) + 1 FROM EmployeeHierarchy) AS level -- Set correct level for the admin
        FROM employee_details e
        INNER JOIN designation d ON e.designation_id = d.id
        INNER JOIN users u ON e.user_id = u.id
        WHERE e.id = e.manager_id;
        `;
      return result;
    } catch (error) {
      console.error("Error fetching employee hierarchy:", error);
      throw new Error("Failed to fetch employee hierarchy");
    }
  }

  async getOrganizationHierarchy(empId: string) {
    try {
      const result = await prisma.$queryRaw`
       WITH EmployeeHierarchy AS (
            -- Base case: Select the given employee
            SELECT
                id, emp_id, first_name, last_name, manager_id, designation_id, user_id
            FROM employee_details
            WHERE emp_id=${empId}

            UNION ALL

            -- Recursive case: Select subordinates
            SELECT
                e.id, e.emp_id, e.first_name, e.last_name, e.manager_id, e.designation_id, e.user_id
            FROM employee_details e
            INNER JOIN EmployeeHierarchy eh ON e.manager_id = eh.id AND e.id <> eh.id
        ),
        ManagerHierarchy AS (
            -- Base case: Select the given employee
            SELECT
                id, emp_id, first_name, last_name, manager_id, designation_id, user_id
            FROM employee_details
            WHERE emp_id=${empId}

            UNION ALL

            -- Recursive case: Select managers
            SELECT
                e.id, e.emp_id, e.first_name, e.last_name, e.manager_id, e.designation_id, e.user_id
            FROM employee_details e
            INNER JOIN ManagerHierarchy mh ON mh.manager_id = e.id AND mh.id <> e.id
        )
        -- Perform LEFT JOINs after recursion
        SELECT
            eh.id,
            eh.emp_id,
            eh.first_name,
            eh.last_name,
            eh.manager_id,
            d.name AS designation_name,
            u.email
        FROM (
            SELECT * FROM EmployeeHierarchy
            UNION
            SELECT * FROM ManagerHierarchy
        ) eh
        LEFT JOIN designation d ON eh.designation_id = d.id
        LEFT JOIN users u ON eh.user_id = u.id
        OPTION (MAXRECURSION 500);

        `;
      return result;
    } catch (error) {
      console.error("Error fetching employee hierarchy:", error);
      throw new Error("Failed to fetch employee hierarchy");
    }
  }

}

export default new EmployeeRepository();
