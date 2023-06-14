declare module 'express-serve-static-core' {
    export interface Request {
        user: {
            id: string;
            email: string;
        };
    }
}
export {};
