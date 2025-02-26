export interface TaskData {
    title: string;
    description: string;
    status: string;
    priority: string;
    project_id: string;
    assigned_to?: string;
    start_date?: Date;
    due_date?: Date;
} 