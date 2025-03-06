import { prisma } from '../config/dbConfig';
import { UserData } from '../types/userTypes';
import logger from '../utils/logger';

class UserRepository {
    async getAllUsers() {
        try {
            return await prisma.users.findMany({
                select: {
                    id: true,
                    email: true,
                    role: true,
                    created_at: true,
                    employee_details: {
                        select: {
                            emp_id: true,
                            first_name: true,
                            last_name: true,
                            gender: true,
                            departments: {
                                select: {
                                    name: true,
                                },
                            },
                            phone: true,
                            mobile: true,
                            designation: {
                                select: {
                                    name: true,
                                }
                            },
                            organization: {
                                select: {
                                    name: true,
                                }
                            },
                            date_of_joining: true,
                            date_of_birth: true,
                            status: true,
                            updated_at: true
                        }
                    }
                }
            });
        } catch (error) {
            logger.error(`Error fetching users: ${error.message}`);
            throw error;
        }
    }

    async getUserById(id: string) {
        try {
            const user = await prisma.users.findUnique({
                where: { id },
                select: {
                    id: true,
                    email: true,
                    role: true,
                    created_at: true,
                    employee_details: {
                        select: {
                            emp_id: true,
                            first_name: true,
                            last_name: true,
                            department_id: true,
                            departments: {
                                select: {
                                    name: true,
                                },
                            },
                            designation: {
                                select: {
                                    name: true,
                                }
                            },
                            organization: {
                                select: {
                                    name: true,
                                }
                            },
                            phone: true,
                            mobile: true,
                            date_of_joining: true,
                            date_of_birth: true,
                            status: true,
                            father_name: true,
                            blood_group: true,
                            personal_email: true,
                            gender: true,
                            country: true,
                            state: true,
                            city: true,
                            pincode: true,
                            permanent_address: true,
                            current_address: true,
                            probation_period: true,
                            notice_period: true,
                            contract_end_date: true,
                            resignation_date: true,
                            last_working_date: true,
                            other_details: true,                            
                            updated_at: true
                        }
                    }
                }
            });
            return user;
        } catch (error: any) {
            logger.error(`Error fetching user by ID: ${error.message}`);
            throw error;
        }
    }

    async createUser(userData: UserData) {
        try {
            return await prisma.users.create({
                data: userData,
            });
        } catch (error) {
            logger.error(`Error creating user: ${error.message}`);
            throw error;
        }
    }

    async updateUser(id: string, userData: Partial<UserData>) {
        try {
            return await prisma.users.update({
                where: { id },
                data: userData,
            });
        } catch (error) {
            logger.error(`Error updating user: ${error.message}`);
            throw error;
        }
    }

    async deleteUser(id: string) {
        try {
            return await prisma.users.delete({
                where: { id },
            });
        } catch (error) {
            logger.error(`Error deleting user: ${error.message}`);
            throw error;
        }
    }
    async getUserByEmail(email: string) {
        try {
            return await prisma.users.findUnique({
                where: { email },
            });
        } catch (error) {
            logger.error(`Error fetching user by email: ${error.message}`);
            throw error;
        }
    }
    async getUsersByRole(role: string) {
        try {
            return await prisma.users.findMany({
                where: { role },
            });
        } catch (error) {
            logger.error(`Error fetching user by email: ${error.message}`);
            throw error;
        }
    }

    async getNotifications(userId: string) {
        try {
            return await prisma.notifications.findMany({
                where: { user_id: userId, is_read: false },
                orderBy: { created_at: 'desc' },
                select: {
                    id: true,
                    user_id: true,
                    message: true,
                    is_read: true,
                    created_at: true,
                }
            });
        } catch (error: any) {
            logger.error(`Error fetching user by email: ${error.message}`);
            throw error;
        }
    }
    async updateNotification(id: string) {
        try {
            return await prisma.notifications.update({
                where: { id },
                data: { is_read: true },
            });
        } catch (error: any) {
            logger.error(`Error fetching user by email: ${error.message}`);
            throw error;
        }
    }

    async getNotificationsHistory(userId: string) {
        try {
            return await prisma.notifications.findMany({
                where: { user_id: userId },
                select: {
                    id: true,
                    user_id: true,
                    message: true,
                    is_read: true,
                    created_at: true,
                }
            });
        } catch (error: any) {
            logger.error(`Error fetching user by email: ${error.message}`);
            throw error;
        }
    }

    async createNotification (userId: string, message: string) {
        try {
            return await prisma.notifications.create({
                data: {
                    user_id: userId,
                    message: message,
                    is_read: false,
                },
            });
        } catch (error: any) {
            logger.error(`Error fetching user by email: ${error.message}`);
            throw error;
        }
    }

    async getAssignedTasks(userId: string) {
        try {
            return await prisma.task_assignments.findMany({
                where: { user_id: userId },
                select: {
                    task_id: false,
                    assigned_at: false,
                    tasks: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            status: true,
                            priority: true,
                            estimated_hours: true,
                            start_date: true,
                            due_date: true,
                            created_at: true,
                            updated_at: true,
                            assigned_by: true, 
                            tasks: {  // Fetch assigner details (assigned_by)
                                select: {
                                    id: true,
                                    employee_details: {
                                        select: {
                                            first_name: true,
                                            last_name: true
                                        }
                                    },
                                    email: true
                                }
                            },
                            projects: { // Fetch related project details
                                select: {
                                    id: true,
                                    project_name: true
                                }
                            }
                        }
                    },
                }
            });
        } catch (error: any) {
            logger.error(`Error fetching assigned tasks: ${error.message}`);
            throw error;
        }
    }

    async getAllAssignedTasks() {
        try {
            return await prisma.task_assignments.findMany({
                select: {
                    user_id: true,
                    task_id: true,
                    assigned_at: true,
                    tasks: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            status: true,
                            priority: true,
                            estimated_hours: true,
                            start_date: true,
                            due_date: true,
                            created_at: true,
                            updated_at: true,
                            assigned_by: true, 
                            tasks: {  // Fetch assigner details (assigned_by)
                                select: {
                                    id: true,
                                    employee_details: {
                                        select: {
                                            first_name: true,
                                            last_name: true
                                        }
                                    },
                                    email: true
                                }
                            },
                            projects: { // Fetch related project details
                                select: {
                                    id: true,
                                    project_name: true
                                }
                            }
                        }
                    },
                }
            });
        } catch (error: any) {
            logger.error(`Error fetching assigned tasks: ${error.message}`);
            throw error;
        }
    }
    
    
}

export default new UserRepository(); 