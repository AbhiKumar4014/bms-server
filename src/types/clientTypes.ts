export interface ClientData {
    company_name: string;
    client_type: string;
    pan_number: string;
    is_active: boolean;
    contact_person: string;
    mailing_country: string;
    mailing_street: string;
    mailing_city: string;
    mailing_state: string;
    mailing_zip_code: string;
    mailing_phone?: string;
    mailing_mobile?: string;
    mailing_fax?: string;
    mailing_email: string;
    same_as_mailing: boolean;
    billing_attention?: string;
    billing_country?: string;
    billing_street?: string;
    billing_city?: string;
    billing_state?: string;
    billing_zip_code?: string;
    billing_phone?: string;
    billing_mobile?: string;
    billing_fax?: string;
    billing_email?: string;
} 