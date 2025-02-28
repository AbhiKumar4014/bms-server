export type ProjectData = {
    project_code: string;
    project_name: string;
    project_description: string;
    planned_start_date: Date;
    planned_end_date: Date;
    revised_planned_end_date?: Date | null;
    actual_start_date?: Date | null;
    actual_end_date?: Date | null;
    contracted_efforts?: string | null;
    planned_efforts?: string | null;
    po_number?: string | null;
    po_amount?: string | null;
    currency?: string | null;
    po_start_date?: Date | null;
    po_end_date?: Date | null;
    po_validity?: string | null;
    po_upliftment_details?: string | null;
    comments?: string | null;
    status: string;
    created_at?: Date;
    updated_at?: Date;
    client_id?: string | null;
  };
  