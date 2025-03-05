export interface AuthenticatedRequest extends Request {
    userId?: string;
    user: any
}