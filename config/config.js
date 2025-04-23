const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    // App Settings
    MONGO_URI: process.env.MONGO_URI
     || (isProduction
        ? '' // force Render to use env var only
        : 'mongodb://localhost:27017/oneonnn'),
    
        TOKEN_SECRET: 'mongoose_project',
    // Other settings...
};
