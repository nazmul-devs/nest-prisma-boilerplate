export default () => ({
    port: parseInt(process.env.PORT as string, 10) || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',

    database: {
        url: process.env.DATABASE_URL,
    },

    auth: {
        jwtSecret: process.env.JWT_SECRET || 'fallback_secret',
        jwtExpires: process.env.JWT_EXPIRES_IN || '1d',
    },

    cors: {
        allowedOrigins: process.env.ALLOWED_ORIGINS
            ? process.env.ALLOWED_ORIGINS.split(',')
            : ['http://localhost:3000'],
    },

    redis: {
        url: process.env.REDIS_URL,
    },

    email: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
        host: process.env.EMAIL_HOST || '://gmail.com',
        port: parseInt(process.env.EMAIL_PORT as string, 10) || 587,
    },
});
