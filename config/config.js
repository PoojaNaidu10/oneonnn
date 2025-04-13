module.exports = {
    // App Settings
    MONGO_URI: process.env.MONGO_URI, // Ensure this is set in Render or your local environment
    
    // JWT encryption salt
    TOKEN_SECRET: 'mongoose_project'
};
