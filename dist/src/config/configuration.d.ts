declare const _default: () => {
    port: number;
    nodeEnv: string;
    database: {
        url: string;
    };
    auth: {
        jwtSecret: string;
        jwtExpires: string;
    };
    cors: {
        allowedOrigins: string[];
    };
    redis: {
        url: string;
    };
    email: {
        user: string;
        pass: string;
        host: string;
        port: number;
    };
};
export default _default;
