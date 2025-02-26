export interface WorkLogData {
    user_id: string;
    project_id: string;
    task_id?: string;
    hours_worked: number;
    work_date: Date;
    comments?: string;
} 