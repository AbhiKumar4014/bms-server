export interface AuthenticatedRequest extends Request {
    userId?: string;
}