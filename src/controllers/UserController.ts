import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import { AuthenticatedRequest } from '../types/RequestTypes';
import bcrypt from 'bcrypt';
import logger from '../utils/logger';
import sendMail from '../utils/sendMail';

class UserController {
    async listUsers(req: AuthenticatedRequest, res: Response) {
        const role = req?.query?.role as string;
        console.log(role);
        if (role) {
            try {
                const users = await UserRepository.getUsersByRole(role as string); // Fetch users by role
                return res.json(users);
            } catch (error) {
                logger.error(`Error listing users by role: ${error?.message}`);
                return res.status(500).json({ error: 'Internal server error' });
            }
        }
        else {
            const id: string = req.userId as string;
            try {
                const user = await UserRepository.getUserById(id);
                if (user.role === "admin") {
                    const users = await UserRepository.getAllUsers();
                    let formatedUsers = users?.map((user) => {
                        const { employee_details } = user;
                        if (!employee_details) {
                            return user;
                        }
                            const { designation, departments, organization } = user?.employee_details;
                            delete user?.employee_details?.departments;
                            delete user?.employee_details?.designation;
                            delete user?.employee_details?.organization;
                            user?.employee_details?.designation = designation?.name;
                            user?.employee_details?.department = departments?.name;
                            user?.employee_details?.organization = organization?.name;
                            return user;
                    });
                    return res.json(formatedUsers);
                }
                return res.status(403).json({ error: "you don't have permission to access this." });
            } catch (error) {
                logger.error(`Error listing users: ${error.message}`);
                return res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async getUser(req: AuthenticatedRequest, res: Response) {
        const id = req.userId as string;
        try {
            const user = await UserRepository.getUserById(id);
            if (!user) {
                return res.status(404).json({ error: `User with ID ${id} not found.` });
            }
            const { designation, departments, organization } = user?.employee_details;
            delete user.employee_details.departments;
            delete user.employee_details.designation;
            delete user.employee_details.organization;
            user.employee_details.designation = designation?.name;
            user.employee_details.department = departments?.name;
            user.employee_details.organization = organization?.name;
            // const formatedUser = {
            //         designation: user?.employee_details?.designation?.name,
            //         department: user?.employee_details?.departments?.name,
            //         organization: user?.employee_details?.organization?.name,
            //         ...user
            //     }
            res.json(user);
        } catch (error) {
            logger.error(`Error in getUser: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const userData = req.body;
            const passwordHash = await bcrypt.hash(userData.password, 10)
            const newUser = {
                user: {
                    email: userData?.personal_email,
                    password_hash: passwordHash,
                    role: userData.role,
                },
                employee_details: {
                    emp_id: userData?.emp_id,
                    first_name: userData?.first_name,
                    last_name: userData?.last_name,
                    department_id: userData.department_id || null,
                    designation_id: userData.designation_id || null,
                    organization_id: userData.organization_id || null,
                    phone: userData.phone,
                    mobile: userData.mobile,
                    date_of_joining: userData.date_of_joining ? new Date(userData.date_of_joining) : null,
                    date_of_birth: userData.date_of_birth ? new Date(userData.date_of_birth) : null,
                    status: userData.status,
                    personal_email: userData.personal_email,
                    gender: userData.gender || null,
                    country: userData.country,
                    state: userData.state,
                    city: userData.city,
                    pincode: userData.pincode,
                    permanent_address: userData.permanent_address,
                    current_address: userData.current_address,
                    probation_period: userData.probation_period,
                    notice_period: userData.notice_period,
                    father_name: userData.father_name,
                    contract_end_date: userData.contract_end_date ? new Date(userData.contract_end_date) : null,
                    resignation_date: userData.resignation_date ? new Date(userData.resignation_date) : null,
                    last_working_date: userData.last_working_date ? new Date(userData.last_working_date) : null,
                    other_details: userData.other_details || "",
                    manager_id: userData.manager_id || null,
                    blood_group: userData.blood_group,
                }
            }
            const user = await UserRepository.createUser(newUser);
            if (user) {
                sendMail(userData);
            }
            res.status(201).json({ user, "message": "Employee registered successfully" });
        } catch (error) {
            logger.error(`Error creating user: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async updateUser(req: AuthenticatedRequest, res: Response) {
        // const id: string = req.userId as string;
        try {
            logger.info({ id: req?.body?.id, data: req.body, msg: "Update" });

            // Extract and delete the updateId from the request body safely
            const { id: updateId, ...body } = req.body;
            delete req.body.employee_details.departments;
            logger.info({ id: req?.body?.id, data: req.body, msg: "Update" });

            // Build the updated data object with proper optional chaining
            const updatedData = {
                employee_details: {
                    update: {
                        ...req?.body?.employee_details,
                    }
                }
            };

            const updatedUser = await UserRepository.updateUser(updateId, updatedData);
            return res.json(updatedUser);
        } catch (error: any) {
            logger.error(`Error updating user: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


    async deleteUser(req: AuthenticatedRequest, res: Response) {
        const id: string = req.userId as string;
        try {
            await UserRepository.deleteUser(id);
            res.status(204).json({ message: 'User deleted successfully' });
        } catch (error) {
            logger.error(`Error deleting user: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getNotifications(req: AuthenticatedRequest, res: Response) {
        const id: string = req.userId as string;
        try {
            const notifications = await UserRepository.getNotifications(id);
            res.json(notifications);
        } catch (error) {
            logger.error(`Error in getNotifications: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getNotificationsHistory(req: AuthenticatedRequest, res: Response) {
        const id: string = req.userId as string;
        try {
            const notifications = await UserRepository.getNotificationsHistory(id);
            res.json(notifications);
        } catch (error) {
            logger.error(`Error in getNotificationsHistory: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async updateNotification(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const updatedNotification = await UserRepository.updateNotification(id);
            res.json(updatedNotification);
        } catch (error) {
            logger.error(`Error updating notification: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async createNotification(req: Request, res: Response) {
        // const userId: string = req.userId as string;
        try {
            const userId = req.body.user_id;
            const notification = await UserRepository.createNotification(userId, req?.body?.message as string);
            res.status(201).json(notification);
        } catch (error: any) {
            logger.error(`Error creating notification: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getAssignedTasks(req: AuthenticatedRequest, res: Response) {
        const id: string = req.userId as string;
        try {
            const tasks = await UserRepository.getAssignedTasks(id);
            return res.json(tasks.map(task => ({
                user_id: task.user_id,
                // task_id: task.task_id,
                // assigned_at: task?.assigned_at,
                id: task.tasks.id,
                title: task.tasks.title,
                description: task.tasks.description,
                status: task.tasks.status,
                priority: task.tasks.priority,
                estimated_hours: task.tasks.estimated_hours,
                start_date: task.tasks.start_date,
                due_date: task.tasks.due_date,
                created_at: task.tasks.created_at,
                updated_at: task.tasks.updated_at,
                project: task.tasks.projects ? { ...task.tasks.projects } : null,
                assigned_by: task.tasks.tasks ? { ...task.tasks.tasks } : null
            })));
        } catch (error) {
            logger.error(`Error in getAssignedTasks: ${error instanceof Error ? error.message : error}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


    async getAllAssignedTasks(req: Request, res: Response) {
        try {
            const tasks = await UserRepository.getAllAssignedTasks();

            return res.json(tasks.map(task => ({
                user_id: task.user_id,
                task_id: task.task_id,
                assigned_at: task.assigned_at,
                tasks: task.tasks ? {
                    id: task.tasks.id,
                    title: task.tasks.title,
                    description: task.tasks.description,
                    status: task.tasks.status,
                    priority: task.tasks.priority,
                    estimated_hours: task.tasks.estimated_hours,
                    start_date: task.tasks.start_date,
                    due_date: task.tasks.due_date,
                    created_at: task.tasks.created_at,
                    updated_at: task.tasks.updated_at,
                    assigned_by: task.tasks.tasks ? {
                        id: task.tasks.tasks.id,
                        name: task.tasks.tasks.name,
                        email: task.tasks.tasks.email
                    } : null,
                    project: task.tasks.projects ? {
                        id: task.tasks.projects.id,
                        project_name: task.tasks.projects.project_name
                    } : null
                } : null
            })));
        } catch (error) {
            logger.error(`Error in getAllAssignedTasks: ${error instanceof Error ? error.message : error}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


}

export default new UserController();