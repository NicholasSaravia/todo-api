declare module 'express-serve-static-core' {
    export interface Request {
        auth: {
            userId: string;
            sessionId: string;
            getToken: () => string;
        };
    }
}
export {};
